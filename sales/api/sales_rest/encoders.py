from common.json import ModelEncoder

from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "import_href"]

    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "employee_id",
        "salesperson_name",
        "customer",
        "vin",
        "price",
        "id",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }

    def get_extra_data(self, o):
        return {"salesperson": o.salesperson.first_name}
