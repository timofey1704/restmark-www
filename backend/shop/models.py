import os
from django.db import models


# Create your models here.
# todo:Перенести сюда все модели из базы данных. Список таблиц
# banners
# customers
# collections
# photos
# products
# texts

#public.banners
class Banners(models.Model):
    title = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255, null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        db_table = 'banners'
        verbose_name = "Banner"
        verbose_name_plural = "Banners"
        
    def __str__(self):
        return self.title

#public.customers
class Customers(models.Model):
    customer_name = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255)
    link = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        db_table = 'customers'
        verbose_name = "Customer"
        verbose_name_plural = "Customers"
        
    def __str__(self):
        return self.customer_name

#public.texts
# class Texts(models.Model):
#     text = models.CharField(max_length=255)
    
#     class Meta:
#         db_table = 'texts'
#         verbose_name = "Text"
#         verbose_name_plural = "Texts"
    

#public.products
class Products(models.Model):
    title = models.CharField(max_length=255)
    country_prod = models.CharField(max_length=255, null=True)
    sales_available = models.BooleanField(default=False)
    category = models.CharField(max_length=50, null=True, blank=True)
    pdf = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        db_table = 'products'
        verbose_name = "Product"
        verbose_name_plural = "Products"
    
    def __str__(self):
        return self.title

#public.collections    
class Collections (models.Model):
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE, db_column='product_id')
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=255, null=True, blank=True)
    discount_price = models.CharField(max_length=255, null=True, blank=True)
    discount_percent = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        db_table = 'collections'
        verbose_name = "Collection"
        verbose_name_plural = "Collections"
    
    def __str__(self):
        return f'{self.product_id.title} - {self.name}'
    
#public.photos

def upload_to(instance, filename):
    # путь для сохранения фоток
    return f'uploads/{filename}'

class Photos(models.Model):
    collection_id = models.ForeignKey(Collections, on_delete=models.CASCADE, db_column='collection_id')
    image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    filename = models.CharField(max_length=255, blank=True)
    path = models.CharField(max_length=255, blank=True)
    
    class Meta:
        db_table = 'photos'
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def save(self, *args, **kwargs):
        # генерация имени файла и пути
        self.filename = os.path.basename(self.image.name)
        # self.path = f'/root/restmark/uploads/{self.filename}'
        self.path = f'/Users/timofey/Desktop/restmark-www/{self.filename}'
        super().save(*args, **kwargs)
    
    # def __str__(self):
    #   return f'{self.product_id.title} - {self.collection_id.name} - {self.filename}'