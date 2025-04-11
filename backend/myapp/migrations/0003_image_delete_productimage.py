# Generated by Django 5.1.4 on 2025-01-12 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_productimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images/')),
            ],
        ),
        migrations.DeleteModel(
            name='ProductImage',
        ),
    ]
