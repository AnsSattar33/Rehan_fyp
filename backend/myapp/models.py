# # myapp/models.py
from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('medicines-pain-relief', 'Pain Relief'),
        ('medicines-antibiotics', 'Antibiotics'),
        ('medicines-supplements', 'Supplements'),
        ('personal-care-skin-care', 'Skin Care'),
        ('personal-care-hair-care', 'Hair Care'),
        ('personal-care-oral-care', 'Oral Care'),
        ('baby-care-diapers', 'Diapers'),
        ('baby-care-feeding', 'Feeding'),
        ('baby-care-toys', 'Toys'),
        ('lifestyle-fitness-yoga', 'Yoga'),
        ('lifestyle-fitness-gym', 'Gym'),
        ('lifestyle-fitness-supplements', 'Supplements'),
        ('organic-vegetables', 'Vegetables'),
        ('organic-fruits', 'Fruits'),
        ('organic-grains', 'Grains'),
        ('healthcare-devices-monitors', 'Monitors'),
        ('healthcare-devices-thermometers', 'Thermometers'),
        ('healthcare-devices-glucometers', 'Glucometers'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='product_images/')  # This stores image in the 'product_images' folder
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    supplier_name = models.CharField(max_length=255)
    description = models.TextField()

class Image(models.Model):
    image = models.ImageField(upload_to='product_images/')
   
    def __str__(self):
        return self.name



  

 
 