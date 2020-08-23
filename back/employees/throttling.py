from rest_framework.throttling import AnonRateThrottle

class EmployeesThrottle(AnonRateThrottle):
    scope = 'employees'