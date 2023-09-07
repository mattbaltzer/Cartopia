from django.contrib import admin
from django.urls import path
from .views import api_salespeople, api_salesperson, api_customers, api_customer

urlpatterns = [
    path('salespeople/', api_salespeople, name="api_salespeople"),
    path('salespeople/<int:id>/', api_salesperson, name="api_salesperson"),
    path('customers/', api_customers, name="api_customers"),
    path('customers/<int:id>/', api_customer, name="api_customer"),
]
