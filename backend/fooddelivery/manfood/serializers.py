from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class FoodItemSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source='category.category_name',
        read_only=True
    )
    image = serializers.SerializerMethodField()

    class Meta:
        model = FoodItem
        fields = '__all__'

    def get_image(self, obj):

        request = self.context.get('request')

        if obj.image:

            return request.build_absolute_uri(
                obj.image.url
            )

        return None

class OrderItemSerializer(serializers.ModelSerializer):

    food_name = serializers.CharField(
        source='food.food_name',
        read_only=True
    )
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Order

        fields = '__all__'