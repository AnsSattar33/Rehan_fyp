# # myapp/serializers.py
# from rest_framework import serializers
# from .models import Product

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'category', 'image', 'price', 'stock', 'supplier_name', 'description']

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # If you need to add custom validations or fields, you can do so here.

    class Meta:
        model = Product
        fields = ['id', 'product_name', 'category', 'price', 'stock', 'supplier_name', 'description']
        # Optionally, you can add read-only fields or exclude fields here, if needed:
        # read_only_fields = ['id']
        # exclude = ['supplier_name']


