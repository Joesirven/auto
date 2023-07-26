from common.json import ModelEncoder, DateEncoder

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
        "id",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "date_time"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "date_time": DateEncoder()
    }
