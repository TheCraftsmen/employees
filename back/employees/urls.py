from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from employees.views import (
	EmployeesViewSet, OfficesViewSet, DepartmentsViewSet
)


employees_router = DefaultRouter()

employees_router.register(r'employees', EmployeesViewSet, base_name='employees')
employees_router.register(r'offices', OfficesViewSet, base_name='offices')
employees_router.register(r'departments', DepartmentsViewSet, base_name='departments')

employees_urls = [
    url(r'^', include(employees_router.urls)),
]
