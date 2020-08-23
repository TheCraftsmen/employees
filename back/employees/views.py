import requests

from functools import partial

from django.core.cache import cache
from django.conf import settings
from django.http import JsonResponse
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

EXTERNAL_URL = 'https://rfy56yfcwk.execute-api.us-west-1.amazonaws.com/bigcorp/employees'

departaments = {item['id']:item for item in settings.DEPARTAMENTS}
offices = {item['id']:item for item in settings.OFFICES}


class EmployeesThrottle(AnonRateThrottle):
    scope = 'employees'


class EmployeesViewSet(ListModelMixin, GenericViewSet):

    throttle_classes = [EmployeesThrottle]

    def get_queryset(self):
        return None

    def set_managers_list(self, employees):
        ids_managers = list(set(map(lambda x: x['manager'], employees)))

        managers_url = f'{EXTERNAL_URL}?'
        for id_manager in ids_managers:
            if id_manager:
                managers_url += f'id={id_manager}&'

        managers = cache.get(managers_url)
        if not managers:
            try:
                response = requests.get(managers_url)
                if response.status_code == 200:
                    managers = response.json()
                    cache.set(managers_url, managers, (60 * 60) * 24)
            except Exception as e:
                return {}

        managers = {item['id']:item for item in managers}
        self.managers = managers

    def get_attr_dict(self, employee_attr):
        if employee_attr in ['department', 'superdepartment']:
            attr_dict = departaments
        elif employee_attr in ['manager']:
            attr_dict = self.managers
        elif employee_attr in ['office']:
            attr_dict = offices
        else:
            attr_dict = {}
        return attr_dict

    def expander(self, employee_attr, subgroups, employee):
        attr_dict = self.get_attr_dict(employee_attr)
        if employee_attr in employee:
            attr_key = employee[employee_attr]
            if isinstance(attr_key, int) and attr_key in attr_dict:
                if subgroups:
                    new_subgroups = subgroups.copy()
                    subgroup = new_subgroups.pop(0)
                    new_data = attr_dict[employee[employee_attr]]
                    expand_data = self.expander(subgroup, new_subgroups, new_data)
                employee[employee_attr] = attr_dict[employee[employee_attr]]
        return employee

    def get_employees(self, limit, offset):
        url = f'{EXTERNAL_URL}?limit={limit}&offset={offset}'
        employees = cache.get(f'employees_{limit}_{offset}')
        if not employees:

            try:
                response = requests.get(url)
                if response.status_code != 200:
                    employees = []

                employees = response.json()
                cache.set(
                    f'employees_{limit}_{offset}',
                    employees, (60 * 60) * 24
                )
            except Exception as e:
                employees = []
        return employees

    def list(self, request, pk=None, *args, **kwargs):
        limit = self.request.query_params.get('limit', 100)
        offset = self.request.query_params.get('offset', 0)
        expand = self.request.query_params.get('expand')
        if expand:
            expand = expand.split(',')

        employees = self.get_employees(limit, offset)

        for elem in expand:
            subgroups = elem.split('.')
            if not subgroups:
                continue

            subgroup = subgroups.pop(0)
            if subgroup == 'manager':
                self.set_managers_list(employees)

            employees = list(map(partial(
                self.expander, subgroup, subgroups), employees
            ))

        return Response(employees, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        employee = cache.get(f'employee_{pk}')
        if not employee:
            try:
                response = requests.get(f'{EXTERNAL_URL}?id={pk}')
                if response.status_code != 200:
                    employee = {}
                employee = response.json()
                cache.set(f'employee_{pk}', employee, (60 * 60) * 24)
            except Exception as e:
                employee = {}
        return Response(employee, status=status.HTTP_200_OK)
