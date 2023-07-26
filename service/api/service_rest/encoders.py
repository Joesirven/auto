from common.json import ModelEncoder

from .models import Technician, AutomobileVO, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "href",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date-time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder
    }
