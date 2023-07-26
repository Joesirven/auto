from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(Appointment)
