from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.db import IntegrityError

from .encoders import (
    TechnicianEncoder,
    AppointmentEncoder,
    AutomobileVOEncoder
)


from .models import Technician, AutomobileVO, Appointment


def api_autoVO(request):
    if request.method == "GET":
        autosVO = AutomobileVO.objects.all()
        return JsonResponse(
            {"autosVO": autosVO},
            encoder=AutomobileVOEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            autosVO = AutomobileVO.objects.create(**content)
            return JsonResponse(
                autosVO,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AttributeError:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )

    else: #POST
        try:
            content = json.loads(request.body)
            print(content)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except IntegrityError:
            response = JsonResponse(
                {
                    "message": "Employee id already exists. Select a unique employee id."
                }
            )
            response.status_code = 400
            return response

        except AttributeError:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(employee_id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(employee_id=id)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(employee_id=id)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else: #POST
        try:
            content = json.loads(request.body)
            try:
                technician = Technician.objects.get(employee_id=content["technician"])
                content["technician"] = technician
                appointment = Appointment.objects.create(**content)
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Technician does not exist"},
                    status=400,
                )
            except IntegrityError:
                return JsonResponse(
                    {"message": "VIN is not unique."},
                    status=400,
                )
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except AttributeError:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            try:
                technician = Technician.objects.get(employee_id=content["technician"])
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Technician does not exist"},
                    status=400,
                )
            except IntegrityError:
                return JsonResponse(
                    {"message": "VIN is not unique."},
                    status=400,
                )
            appointment = Appointment.objects.get(id=id)
            props = [
                "reason",
                "status",
                "vin",
                "customer",
                "technician",
                "date_time",
            ]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointmnet does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        setattr(appointment, "status", "cancel")
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointmnet does not exist"})
        response.status_code = 404
        return response


@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        setattr(appointment, "status", "finished")
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointmnet does not exist"})
        response.status_code = 404
        return response
