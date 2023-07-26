from django.urls import path
from .views import (
    api_technicians,
    api_technician,
    api_appointments,
    api_appointment,
    api_autoVO,
    api_appointment_cancel,
    api_appointment_finish,
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>/", api_appointment, name="api_appointment"),
    path("autosvo/", api_autoVO, name="api_autosvo"),
    path(
        "appointments/<int:id>/cancel/",
        api_appointment_cancel,
        name="cancel_appointment",
    ),
    path(
        "appointments/<int:id>/finish/",
        api_appointment_finish,
        name="finish_appointment",
    ),
]
