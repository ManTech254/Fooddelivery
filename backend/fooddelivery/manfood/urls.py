from django.urls import path
from .views import *

urlpatterns = [
    path('admin-login/', admin_login_api),
    path('add-category/', add_category),
    path('list-categories/', list_categories),
    path('delete-category/<int:id>/', delete_category),
    path('add-food/', add_food),
    path('list-foods/', list_foods),
    path('update-category/<int:id>/', update_category),
    path('delete-food/<int:id>/',delete_food),
    path('update-food/<int:id>/',update_food),
    path('customer-foods/',customer_foods),
    path('place-order/', place_order),
    path("orders/", get_orders),
    path("orders/<int:pk>/", update_order_status),
    path('register/', register_user),
    path("reports/weekly/", weekly_report),
    path("reports/monthly/", monthly_report),
    path("reports/daily/", daily_report),
    path("reports/sales/", sales_report),
    path("users/", get_users),
    path("customer-login/", customer_login),
    ]
