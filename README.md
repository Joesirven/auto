# CarCar

Team:

* Jose Sirven - Service Microservice
* Amanuel Yiblet - Sales Microservice

## Design

## Service microservice

The service microservice keeps track of service appointments and technicians working on those service appointmnets. It has 3 models: AutomobileVO, Technicians, and Appointments. The AutomobileVO model is a value object that mirrors the Automobile objects in the Inventory API. The AuthomobileVO only pulls the vin and the sold status field.

The appointment model has fields for date_time, reason, status, vin, customer and technician (which is a foreign key to the Technician model). There are specific API calls that create, delete, and list appointments, as well as specific calls that update the status of appointments to canceled or finished. Please note that Appointment's vin field is not a foreign key but must be unique and the employee id value is used to attach Technicians to appointments. If a service appointment with a vehicle with a matching VIN in the inventory API (meaning it was bought at the car dealership), then it will be marked as VIP.

The Technician model has fields for first_name, last_name, and employee_id. There are specific API calls that create, list, and delete technicians. Please note that the employee_id is a unique field that is used to reference the technicians in the appointment objects.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
