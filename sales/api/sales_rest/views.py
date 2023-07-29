from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
        "import_href",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_automobileVO(request):
    if request.method == "GET":
        automobileVO = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobileVO": automobileVO},
            encoder=AutomobileVOEncoder
        )


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        salespeople = Salesperson.objects.create(**content)
        return JsonResponse(
            salespeople,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_salesperson(request, pk):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        print(content)
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_customer(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            href = f"/api/automobiles/{content['automobile']}/"
            automobile_VO = AutomobileVO.objects.get(import_href=href)
            content["automobile"] = automobile_VO
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile value object does not exist"},
                status=404
            )
        try:
            salesperson = Salesperson.objects.get(
                employee_id=content['salesperson']
            )
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson object does not exist"},
                status=404
            )
        try:
            customer = Customer.objects.get(id=content['customer'])
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer object does not exist"},
                status=404
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
            status=200
        )


@require_http_methods(["DELETE"])
def api_sale(request, pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
