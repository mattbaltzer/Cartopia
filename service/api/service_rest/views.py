from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "id",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder()
        }

    def get_extra_data(self, o):
        count= AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip": count > 0}



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technicians = Technician.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(['DELETE'])
def api_delete_technician(request, id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})




@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician

            content["status"] = "created"

        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )
        appointments = Appointment.objects.create(**content)
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(['DELETE'])
def api_delete_appointment(request, id):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})



@require_http_methods(["PUT"])
def api_finished_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
        )

    except:
        Appointment.DoesNotExist
        response = JsonResponse({"message": "Appointment does not exist"})
        response.status_code = 404
        return response


@require_http_methods(["PUT"])
def api_canceled_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
        )

    except:
        Appointment.DoesNotExist
        response = JsonResponse({"message": "Appointment does not exist"})
        response.status_code = 404
        return response