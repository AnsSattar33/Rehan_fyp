# from django.urls import path
# from . import views
# from django.conf import settings
# from django.conf.urls.static import static
# from .views import LoginView

# urlpatterns = [
#     path('add-product/', views.add_product, name='add_product'),
#      path('api/admin/login', LoginView.as_view(), name='login_view'),  # Your existing view for adding product
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Ensure media files are served during development


from django.urls import path
from .views import (
    LoginView,   AddProductView,
    ListProductsView, ProductDetailView, DeleteProductView
)

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    
    path('api/products/', AddProductView.as_view(), name='add-product'),
    path('api/products/list/', ListProductsView.as_view(), name='list-products'),
    path('api/products/<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/products/<int:product_id>/delete/', DeleteProductView.as_view(), name='delete-product'),
]
