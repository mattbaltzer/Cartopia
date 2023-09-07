from django.db import models



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=16)
    sold = models.CharField(max_length=20)
    import_href = models.CharField(max_length=200, unique=True)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return self.first_name

    class Meta:
        ordering = ("first_name", "last_name") # Default ordering for Customer

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.PositiveSmallIntegerField(null=True)
