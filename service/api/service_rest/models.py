from django.db import models

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
            Technician,
            related_name="appointments",
            on_delete=models.CASCADE,
        )


