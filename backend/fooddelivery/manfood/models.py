from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=50, null=True, unique=True)
    mobile = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=50)
    reg_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Category(models.Model):
    category_name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category_name
    
class Item(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_description = models.TextField(max_length=500, null=True, blank=True)
    image = models.ImageField(upload_to='food_images/')
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.item_name} ({self.item_quantity})"
    
class FoodItem(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )
    food_name = models.CharField(max_length=200)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    description = models.TextField()
    image = models.ImageField(
        upload_to='foods/'
    )
    quantity = models.CharField(
    max_length=100,
    null=True,
    blank=True)
    is_available = models.BooleanField(default=True)
    creation_date = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.food_name
    
class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
    )
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    notes = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending")
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"
    

class OrderItem(models.Model):

    order = models.ForeignKey(Order,on_delete=models.CASCADE, related_name='items')
    food = models.ForeignKey(FoodItem,on_delete=models.CASCADE)
    quantity = models.IntegerField()    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField( max_digits=10, decimal_places=2)

    def __str__(self):

        return self.food.food_name