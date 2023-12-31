from django.contrib import admin
from django.urls import path
from .views import api_salespeople, api_salesperson, api_customers
from .views import api_customer, api_sales, api_sale, api_automobileVO

urlpatterns = [
    path("admin/", admin.site.urls),
    path("automobileVO/", api_automobileVO, name="api_automobileVO"),
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
]
