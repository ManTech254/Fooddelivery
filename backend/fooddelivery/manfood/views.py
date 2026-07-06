from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Count
from django.core.paginator import Paginator
# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_staff:
        return Response({"message":"Login successful", "username":username}, status=200)
    return Response({"message":"Invalid credentials"}, status=401)

@api_view(['POST'])
def add_category(request):

    category_name = request.data.get('category_name')

    if not category_name:
        return Response(
            {"message": "Category name is required"},
            status=400
        )

    Category.objects.create(
        category_name=category_name
    )

    return Response(
        {"message": "Category added successfully"},
        status=201
    )
@api_view(['GET'])
def list_categories(request):

    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return Response(serializer.data)

@api_view(['DELETE'])
def delete_category(request, id):

    try:
        category = Category.objects.get(id=id)

        category.delete()

        return Response(
            {"message": "Category deleted successfully"},
            status=200
        )

    except Category.DoesNotExist:

        return Response(
            {"message": "Category not found"},
            status=404
        )

@api_view(['PUT'])
def update_category(request, id):

    try:
        category = Category.objects.get(id=id)

        category.category_name = request.data.get('category_name')

        category.save()

        return Response(
            {"message": "Category updated successfully"},
            status=200
        )

    except Category.DoesNotExist:

        return Response(
            {"message": "Category not found"},
            status=404
        )

@api_view(['POST'])
def add_food(request):

    try:

        category_id = request.data.get('category')

        category = Category.objects.get(id=category_id)

        is_available = request.data.get('is_available') == 'true'

        food = FoodItem.objects.create(
            category=category,
            food_name=request.data.get('food_name'),
            price=request.data.get('price'),
            description=request.data.get('description'),
            image=request.FILES.get('image'),
            quantity=request.data.get('quantity'),
            is_available=is_available
        )

        return Response(
            {"message": "Food item added successfully"},
            status=201
        )

    except Exception as e:

        return Response(
            {"message": str(e)},
            status=400
        )

@api_view(['GET'])
def list_foods(request):

    foods = FoodItem.objects.all().order_by('-id')

    serializer = FoodItemSerializer(
        foods,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)

@api_view(['DELETE'])
def delete_food(request, id):

    try:

        food = FoodItem.objects.get(id=id)

        food.delete()

        return Response(
            {"message": "Food deleted successfully"},
            status=200
        )

    except FoodItem.DoesNotExist:

        return Response(
            {"message": "Food not found"},
            status=404
        )
@api_view(['PUT'])
def update_food(request, id):

    try:

        food = FoodItem.objects.get(id=id)

        category_id = request.data.get('category')

        category = Category.objects.get(id=category_id)

        food.category = category
        food.food_name = request.data.get('food_name')
        food.price = request.data.get('price')
        food.description = request.data.get('description')
        food.quantity = request.data.get('quantity')

        is_available = (
            request.data.get('is_available') == 'true'
        )

        food.is_available = is_available

        # Update image only if new image exists
        if request.FILES.get('image'):

            food.image = request.FILES.get('image')

        food.save()

        return Response(
            {"message": "Food updated successfully"},
            status=200
        )

    except Exception as e:

        return Response(
            {"message": str(e)},
            status=400
        )

@api_view(['GET'])
def customer_foods(request):

    foods = FoodItem.objects.filter(
        is_available=True
    ).order_by('-id')

    serializer = FoodItemSerializer(
        foods,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)

@api_view(['POST'])
def place_order(request):
    try:
        # Create order
        order = Order.objects.create(
            customer_name=request.data.get(
                'customer_name'
            ),
            phone_number=request.data.get(
                'phone_number'
            ),
            address=request.data.get(
                'address'
            ),
            notes=request.data.get(
                'notes'
            ),
            payment_method=request.data.get(
                'payment_method'
            ),
            total_amount=request.data.get(
                'total_amount'
            )
        )

        # Get cart items
        items = request.data.get('items')
        # Save order items
        for item in items:
            food = FoodItem.objects.get(
                id=item['id']
            )
            quantity = item['quantityCount']
            price = float(item['price'])
            subtotal = quantity * price
            OrderItem.objects.create(
                order=order,
                food=food,
                quantity=quantity,
                price=price,
                subtotal=subtotal
            )
        return Response(
            {
                "message":
                "Order placed successfully"
            },
            status=201
        )
    except Exception as e:
        return Response(
            {
                "message": str(e)
            },
            status=400
        )

# GET ORDERS
@api_view(["GET"])
def get_orders(request):
    status = request.GET.get("status")
    if status:
        orders = Order.objects.filter(
            status=status
        ).order_by("-creation_date")
    else:
        orders = Order.objects.all().order_by("-creation_date")
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# UPDATE STATUS
@api_view(["PATCH"])
def update_order_status(request, pk):
    try:
        order = Order.objects.get(id=pk)
        new_status = request.data.get("status")
        order.status = new_status
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response({
            "error": "Order not found"
        }, status=404)
    

@api_view(["POST"])
def register_user(request):

    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    email = request.data.get("email")
    mobile = request.data.get("mobile")
    password = request.data.get("password")

    # CHECK EMAIL
    if User.objects.filter(email=email).exists():

        return Response({
            "error": "Email already exists"
        }, status=status.HTTP_400_BAD_REQUEST)

    # CHECK MOBILE
    if User.objects.filter(mobile=mobile).exists():

        return Response({
            "error": "Mobile number already exists"
        }, status=status.HTTP_400_BAD_REQUEST)

    # CREATE USER
    user = User.objects.create_user(
    username=email,
    email=email,
    password=password
)

    return Response({
        "message": "User registered successfully"
    }, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def customer_login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=email, password=password)

    if user is not None:

        return Response({
            "message": "Login successful",
            "user_id": user.id,
            "first_name": user.first_name,
            "email": user.email,
            "is_staff": user.is_staff
        })

    return Response(
        {"error": "Invalid email or password"},
        status=status.HTTP_401_UNAUTHORIZED
    )
@api_view(["GET"])
def weekly_report(request):

    today = timezone.now()
    week_ago = today - timedelta(days=7)

    orders = Order.objects.filter(
        creation_date__gte=week_ago
    )

    total_orders = orders.count()

    confirmed_orders = orders.filter(
        status="confirmed"
    ).count()

    revenue = orders.aggregate(
        total=Sum("total_amount")
    )["total"] or 0

    confirmation_rate = 0

    if total_orders > 0:
        confirmation_rate = round(
            (confirmed_orders / total_orders) * 100,
            1
        )

    daily_summary = []

    for i in range(7):
        day = week_ago + timedelta(days=i)

        day_orders = orders.filter(
            creation_date__date=day.date()
        )

        daily_summary.append({
            "day": day.strftime("%A"),
            "orders": day_orders.count(),
            "revenue": float(
                day_orders.aggregate(
                    total=Sum("total_amount")
                )["total"] or 0
            ),
            "status": "Completed"
        })

    return Response({
        "total_orders": total_orders,
        "confirmed_orders": confirmed_orders,
        "revenue": revenue,
        "confirmation_rate": confirmation_rate,
        "daily_summary": daily_summary
    })

@api_view(["GET"])
def monthly_report(request):

    today = timezone.now()

    performance = []

    for i in range(4):

        week_end = today - timedelta(days=i * 7)
        week_start = week_end - timedelta(days=7)

        orders = Order.objects.filter(
            creation_date__gte=week_start,
            creation_date__lt=week_end
        )

        total_orders = orders.count()

        revenue = orders.aggregate(
            total=Sum("total_amount")
        )["total"] or 0

        performance.append({
            "week": f"Week {4-i}",
            "orders": total_orders,
            "revenue": float(revenue)
        })

    performance.reverse()

    return Response({
        "weekly_performance": performance
    })

@api_view(["GET"])
def daily_report(request):

    today = timezone.now().date()

    orders = Order.objects.filter(
        creation_date__date=today
    ).order_by("-creation_date")

    total_orders = orders.count()

    confirmed_orders = orders.filter(
        status="confirmed"
    ).count()

    revenue = orders.aggregate(
        total=Sum("total_amount")
    )["total"] or 0

    orders_data = []

    for order in orders:
        orders_data.append({
            "id": order.id,
            "customer_name": order.customer_name,
            "amount": float(order.total_amount),
            "payment_method": order.payment_method,
            "status": order.status,
            "time": order.creation_date.strftime("%I:%M %p")
        })

    return Response({
        "total_orders": total_orders,
        "confirmed_orders": confirmed_orders,
        "revenue": revenue,
        "orders": orders_data
    })

@api_view(["GET"])
def sales_report(request):

    page = int(request.GET.get("page", 1))

    # SUMMARY DATA
    total_sales = Order.objects.aggregate(
        total=Sum("total_amount")
    )["total"] or 0

    total_orders = Order.objects.count()

    confirmed_orders = Order.objects.filter(
        status="confirmed"
    ).count()

    confirmation_rate = 0

    if total_orders > 0:
        confirmation_rate = round(
            (confirmed_orders / total_orders) * 100,
            1
        )

    # PAGINATED ORDERS
    orders = Order.objects.order_by("-creation_date")

    paginator = Paginator(orders, 5)

    current_page = paginator.get_page(page)

    orders_data = []

    for order in current_page:
        orders_data.append({
            "id": order.id,
            "customer_name": order.customer_name,
            "amount": float(order.total_amount),
            "payment_method": order.payment_method,
            "status": order.status,
            "date": order.creation_date.strftime("%d-%m-%Y %H:%M"),
        })

    return Response({
        "total_sales": float(total_sales),
        "total_orders": total_orders,
        "confirmed_orders": confirmed_orders,
        "confirmation_rate": confirmation_rate,

        "recent_orders": orders_data,
        "current_page": page,
        "total_pages": paginator.num_pages,
        "has_next": current_page.has_next(),
        "has_previous": current_page.has_previous(),
    })

@api_view(["GET"])
def get_users(request):

    users = User.objects.all().order_by("-id")

    data = []

    for user in users:
        data.append({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "mobile": user.mobile,
            "reg_date": user.reg_date,
        })

    return Response(data)