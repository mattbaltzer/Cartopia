# CarCar

Team:

* Laura - Service Microservice
* Matt - Sales Microservice

## Design

## Service microservice

Automobile Service Microservice
For Automobile Service, the main functionality of this microservice is to keep track of technicians and service appointments for automobiles and their owners. You can create, list and delete technicians. You can also create, list, delete, and update service appointments. There are two special features for service appointments:
VIP - If an appointment VIN matches an existing automobile in our inventory, it is marked as “VIP”
Appointment Status - When an appointment is created, its status is defaulted to created. You can update its status to finished or canceled.


Models
For the Service microservice, there are three models:
1. Technician - containing first_name, last_name, and employee_id fields
2. AutomobileVO (which is a value object of Automobile) - containing vin and sold fields
3. Appointment - containing date_time, reason, status, vin, customer and technician fields. The technician field is a foreign key.


Poller
There is an Automobile poller that updates the AutomobileVO every 60 seconds with updated VINs from the Inventory service.


Technician API Endpoints
Method: GET
Action: List technicians
URL: http://localhost:8080/api/technicians/

Method: POST
Action: Create a technician
URL: http://localhost:8080/api/technicians/

Method: DELETE
Action: Delete a specific technician
URL: http://localhost:8080/api/technicians/:id/


Service Appointment API Endpoints
Method: GET
Action: List appointments
URL: http://localhost:8080/api/appointments/

Method: POST
Action: Create an appointment
URL: http://localhost:8080/api/appointments/

Method: DELETE
Action: Delete an appointment
URL: http://localhost:8080/api/appointments/:id/

Method: PUT
Action: Set appointment status to "canceled"
URL: http://localhost:8080/api/appointments/:id/cancel/

Method: PUT
Action: Set appointment status to "finished"
URL: http://localhost:8080/api/appointments/:id/finish/


Sample Request Bodies

Creating a Technician
Here is a sample request body for creating a technician:

{
  "first_name": "Lily",
  "last_name": "Bloom",
  "employee_id": "employee123"
}

Here is a sample response:

{
	"first_name": "Lily",
	"last_name": "Bloom",
	"employee_id": "employee123"
}


Creating an Appointment
Below is a sample request body for creating an appointment.
*Please note that your technician input must be an existing technician’s employee_id.
Also date_time is in UTC.

{
  "customer": "Atlas",
  "date_time": "2023-12-02 12:00",
	"reason": "oil change",
	"status": "created",
	"technician": "testing123",
	"vin": "1C3CC5FB2AN120392"
}

Here is a sample response:

{
	"date_time": "2023-12-02 12:00",
	"reason": "oil change",
	"status": "created",
	"vin": "1C3CC5FB2AN120392",
	"customer": "Atlas",
	"id": 29,
	"technician": {
		"first_name": "laura",
		"last_name": "le",
		"employee_id": "testing123"
	},
	"vip": false
}


Updating Appointment Status
Here is a sample request body for updating the appointment status to canceled:

{
	"status": "canceled"
}

Here is a sample request body for updating the appointment status to finished:

{
	"status": "finished"
}



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
