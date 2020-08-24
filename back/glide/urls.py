from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from employees.urls import employees_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'', include((employees_urls, 'employees'))),
]
