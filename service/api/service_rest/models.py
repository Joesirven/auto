from django.db import models
from django.urls import reverse

# Create your models here.


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100,)
    last_name = models.CharField(max_length=100,)
    employee_id = models.CharField(max_length=50,)

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=100,)
    last_name = models.CharField(max_length=100,)
    address = models.CharField(max_length=150,)
    phone_number = models.CharField(max_length=30,)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200,)
    sold = models.BooleanField(default=False,)

    def get_api_url(self):
        return reverse("api_automobileVO", kwargs={"pk": self.id})

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.id})
