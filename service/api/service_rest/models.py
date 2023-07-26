from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=100,)
    last_name = models.CharField(max_length=100,)
    employee_id = models.CharField(max_length=50, unique=True,)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200,)
    sold = models.BooleanField(default=False,)
    href = models.CharField(unique=True, max_length=100,)

    def get_api_url(self):
        return reverse("api_automobileVO", kwargs={"pk": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=500,)
    status = models.CharField(
        max_length=20,
        default="created",
    )
    vin = models.CharField(
        max_length=100,
        unique=True,
    )
    customer = models.CharField(max_length=150,)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name="appointment",
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
