# myapp/views.py
import json  # Add this import
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import Product
from .serializers import ProductSerializer

# Login view for user authentication
class LoginView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = json.loads(request.body)  # Use json to load the request body
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            # Here, generate a JWT token or any response you prefer
            return JsonResponse({"message": "Login successful", "token": "JWT_TOKEN", "userId": user.id}, status=200)
        else:
            return JsonResponse({"error": "Invalid email or password"}, status=400)

# Add product view
class AddProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()  # Save the product to the database
            return Response({"message": "Product added successfully!", "product_id": product.id}, status=201)
        else:
            return Response(serializer.errors, status=400)

# List products view
class ListProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=200)

# Product detail view
class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=200)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

# Delete product view
class DeleteProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({"message": "Product deleted successfully!"}, status=204)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
# from .models import Product, ProductImage
# from .serializers import ProductSerializer
# from django.core.files.storage import default_storage
# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated

# import logging

# logger = logging.getLogger(__name__)

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         # Fetch user by email
#         user = User.objects.filter(email=email).first()
#         if user and user.check_password(password):
#             # Generate JWT tokens
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)

#             return Response({
#                 'token': access_token,
#                 'userId': user.id,
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({
#                 'error': 'Invalid email or password',
#             }, status=status.HTTP_401_UNAUTHORIZED)


# class RegisterView(APIView):
#     """
#     Handles user registration.
#     """
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         username = request.data.get('username')

#         if User.objects.filter(email=email).exists():
#             return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.create_user(username=username, email=email, password=password)
#         user.save()

#         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# class AddProductView(APIView):
#     """
#     Handles adding a new product along with its images.
#     """
#     permission_classes = [IsAuthenticated]  # Ensure only authenticated users can add products

#     def post(self, request, *args, **kwargs):
#         try:
#             # Extract product data
#             product_data = {
#                 'product_name': request.data.get('product_name'),
#                 'category': request.data.get('category'),
#                 'price': request.data.get('price'),
#                 'stock': request.data.get('stock'),
#                 'supplier_name': request.data.get('supplier_name'),
#                 'description': request.data.get('description'),
#             }

#             # Validate and save product
#             serializer = ProductSerializer(data=product_data)
#             serializer.is_valid(raise_exception=True)
#             product = serializer.save()

#             # Handle product images
#             images = request.FILES.getlist('images')
#             for image in images:
#                 ProductImage.objects.create(product=product, image=image)

#             # Return the created product data
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class ListProductsView(APIView):
#     """
#     Handles listing all products.
#     """
#     def get(self, request, *args, **kwargs):
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# class ProductDetailView(APIView):
#     """
#     Handles retrieving details of a single product by ID.
#     """
#     def get(self, request, product_id, *args, **kwargs):
#         try:
#             product = Product.objects.get(id=product_id)
#             serializer = ProductSerializer(product)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# class DeleteProductView(APIView):
#     """
#     Handles deleting a product by ID.
#     """
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, product_id, *args, **kwargs):
#         try:
#             product = Product.objects.get(id=product_id)
#             product.delete()
#             return Response({'message': 'Product deleted successfully'}, status=status.HTTP_200_OK)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
