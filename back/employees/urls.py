from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from employees.views import EmployeesViewSet


employees_router = DefaultRouter()
# User's
employees_router.register(r'employees', EmployeesViewSet, base_name='employees')

employees_urls = [
    url(r'^', include(employees_router.urls)),
]
