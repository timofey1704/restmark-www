from django.db import models
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from .authentication import CustomAuthentication
from shop.models import Banners, Customers, Texts, Products, Collections, Photos


# Create your models here.

class BannersResource(ModelResource):
    class Meta:
        queryset = Banners.objects.all()
        resource_name = 'banners'
        allowed_methods = ['get']
        
class CustomersResource(ModelResource):
    class Meta:
        queryset = Customers.objects.all()
        resource_name = 'customers'
        allowed_methods = ['get']
        
class TextsResource (ModelResource):
    class Meta:
        queryset = Texts.objects.all()
        resource_name = 'texts'
        
