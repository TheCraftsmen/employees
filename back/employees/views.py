import requests

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


def departaments(request):
    return JsonResponse(settings.DEPARTAMENTS, safe=False)


def offices(request):
    return JsonResponse(settings.OFFICES, safe=False)


class EmployeesViewSet(ListModelMixin, GenericViewSet):

    throttle_classes = [EmployeesThrottle]

    def get_queryset(self):
        return None

    def list(self, request, pk=None, *args, **kwargs):
        limit = self.request.query_params.get('limit', 100)
        offset = self.request.query_params.get('offset', 0)

        url = f'{EXTERNAL_URL}?limit={limit}&offset={offset}'

        employees = cache.get(f'employees_{limit}_{offset}')
        if not employees:
            response = requests.get(url)
            if response.status_code != 200:
                employees = []

            employees = response.json()
            cache.set(
                f'employees_{limit}_{offset}',
                employees, 60 * 60
            )

        return Response(employees, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        employee = cache.get(f'employee_{pk}')
        if not employee:
            response = requests.get(f'{EXTERNAL_URL}?id={pk}' )
            if response.status_code == 200:
                employee = response.json()
                cache.set(f'employee_{pk}', employee, 60 * 60)
            else:
                print(response.json())
                employee = {}
        return Response(employee, status=status.HTTP_200_OK)
