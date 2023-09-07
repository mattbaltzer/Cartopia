from django.urls import path

from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_delete_appointment, api_finished_appointment, api_canceled_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_create_technicians"),
    path('technicians/<str:employee_id>/', api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_list_appointments, name="api_create_appointments"),
    path('appointments/<int:id>/', api_delete_appointment, name="api_delete_appointment"),
    path('appointments/<int:id>/finish/', api_finished_appointment, name="api_finished_appointment"),
    path('appointments/<int:id>/cancel/', api_canceled_appointment, name="api_canceled_appointment"),

]