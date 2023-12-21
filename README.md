# Cartopia

Team:

-   Laura - Service Microservice
-   Matt - Sales Microservice

How to start the project:

1. Navigate to the GitLab url.
2. Click the Fork button at the top.
3. Navigate to your personal GitLab.
4. Click on the Clone button.
5. Select either HTTP or SSH.
6. Open your terminal.
7. Navigate to your folder location, then run git clone (paste clone clipboard here).
8. Open up VSCode in the top level of the folder.
9. Run these commands:
   docker volume create beta-data
   docker-compose build
   docker-compose up
10. Navigate to localhost:3000 to see the ReactApp.

## Design

![CarCar Diagram](CarCar%20Diagram.png "Project Beta Diagram")

## Service microservice

For Automobile Service, the main functionality of this microservice is to keep track of technicians and service appointments for automobiles and their owners. You can create, list and delete technicians. You can also create, list, delete, and update service appointments. There are two special features for service appointments:

VIP - If an appointment VIN matches an existing automobile in our inventory, it is marked as “VIP”

Appointment Status - When an appointment is created, its status is defaulted to created. You can update its status to finished or canceled.

## Models

For the Service microservice, there are three models:

1. Technician - containing first_name, last_name, and employee_id fields
2. AutomobileVO (which is a value object of Automobile) - containing vin and sold fields
3. Appointment - containing date_time, reason, status, vin, customer and technician fields. The technician field is a foreign key.

## Poller

There is an Automobile poller that updates the AutomobileVO every 60 seconds with updated VINs from the Inventory service.

## Technician API Endpoints

Method: GET

Action: List technicians

URL: http://localhost:8080/api/technicians/

Method: POST

Action: Create a technician

URL: http://localhost:8080/api/technicians/

Method: DELETE

Action: Delete a specific technician

URL: http://localhost:8080/api/technicians/:id/

**Service Appointment API Endpoints**

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

## Sample Request Bodies

## Creating a Technician

Here is a sample request body for creating a technician:

```
{
	"first_name": "Lily",
	"last_name": "Bloom",
	"employee_id": "employee123"
}
```

Here is a sample response:

```
{
	"first_name": "Lily",
	"last_name": "Bloom",
	"employee_id": "employee123"
}
```

## Creating an Appointment

Below is a sample request body for creating an appointment.

Please note that your technician input must be an existing technician’s employee_id.

Also date_time is in UTC.

```
{
	"customer": "Atlas",
	"date_time": "2023-12-02 12:00",
	"reason": "oil change",
	"status": "created",
	"technician": "testing123",
	"vin": "1C3CC5FB2AN120392"
}
```

Here is a sample response:

```
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
```

## Updating Appointment Status

Here is a sample request body for updating the appointment status to canceled:

```
{
	"status": "canceled"
}
```

Here is a sample request body for updating the appointment status to finished:

```
{
	"status": "finished"
}
```

## Sales microservice

For Automobile Sales, the main purpose of this microservice is to track the Salespeople, Customers, and Sales of automobiles. You're able to create, list and delete Salespeople, Customers, and Sales; ,most notably you're able to track the Salesperson's History. There is one special feature for the Sales microservice:

SOLD - If an automobile is unsold and currently in the Inventory, then it can be sold to a customer. A record of the Sale will be recorded. It will be attached to the Salesperson and shows the customer that purchased it, the VIN for the automobile purchased, and what the price was.

## Models

For the Sales microservice, there are four models:

1. Salesperson - contains the first_name, last_name, and employee_id fields.
   2.Customer - contains the first_name, last_name, address, and phone_number fields.
2. Sale - containing the price field. It has three foreign keys:
   automobile, which points at the AutomobileVO.
   salesperson, which points at the Salesperson model.
   customer, which points at the Customer model.
3. AutomobileVO (which is a Value Object of Automobile, from the Inventory) - containing vin and sold fields

## Poller

There is an Automobile poller that updates the AutomobileVO every 60 seconds with updated VINs from the Inventory service.

## Salesperson API Endpoints

Method: GET

Action: List salespeople

URL: http://localhost:8090/api/salespeople/

Method: POST

Action: Create a salesperson

URL: http://localhost:8090/api/salespeople/

Method: DELETE

Action: Delete a salesperson

URL: http://localhost:8090/api/salespeople/:id/

## Customer API Endpoints

Method: GET

Action: List customers

URL: http://localhost:8090/api/customers/

Method: POST

Action: Create an appointment

URL: http://localhost:8090/api/customers/

Method: DELETE

Action: Delete a customer

URL: http://localhost:8090/api/customers/:id/

## Sales API Endpoints

Method: GET

Action: List sales

URL: http://localhost:8090/api/sales/

Method: POST

Action: Create a sale

URL: http://localhost:8090/api/sales/

Method: DELETE

Action: Delete a sale

URL: http://localhost:8090/api/sales/:id/

## Sample Request Bodies

## Creating a Salesperson

Here is a sample request body for creating a technician:

```
{
	"first_name": "Vicky",
	"last_name": "Valentine",
	"employee_id": "vvalentine"
}
```

Here is a sample response:

```
{
	"first_name": "Vicky",
	"last_name": "Valentine",
	"employee_id": "vvalentine"
}
```

## Creating a Customer

Below is a sample request body for creating a customer.

```
{
	"first_name": "Frank",
	"last_name": "McMan",
	"address": "4567 Hot Sauce Alley, KY 91100",
	"phone_number": "123-456-7890",
}
```

Here is a sample response:

```
{
	"first_name": "Frank",
	"last_name": "McMan",
	"address": "4567 Hot Sauce Alley, KY 91100",
	"phone_number": "123-456-7890",
}
```

## Creating a Sale

Below is a sample request body for creating a customer.

```
{
	"automobile": "11111111111111111",
	"salesperson": "vvalentine",
	"customer": "1",
	"price": 5000
}
```

Here is a sample response:

```
{
	"salesperson": {
		"first_name": "Vicky",
		"last_name": "Valentine",
		"employee_id": "vvalentine",
	},
	"customer": {
		"first_name": "Frank",
		"last_name": "McMan",
		"address": "4567 Hot Sauce Alley, KY 91100",
		"phone_number": "123-456-7890",
	},
	"automobile": {
		"vin": "11111111111111111",
		"sold": false
	},
	"price": 5000,
}
```

Note: The "sold" will be updated based upon if you decided to update the sold status on the front-end or back-end. For this particular project, the "sold" status is updated on the front-end
