from django.urls import path
from .views import (
    api_technicians,
    api_technician,
    api_appointments,
    api_appointment
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technician/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointment/", api_appointment, name="api_appointment"),
]
