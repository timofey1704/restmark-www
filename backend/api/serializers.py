from rest_framework import serializers
from shop.models import Banners, Customers, Seolinks, Products, Collections, Photos



class BannersMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banners
        fields = "__all__"

class CustomersMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = "__all__"
        
class SeoLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seolinks
        fields = "__all__"

class TelegramMessageSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['id', 'filename', 'path']
    
class CollectionSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    class Meta:
        model = Collections
        fields = [
            'id', 
            'name', 
            'price', 
            'discount_price', 
            'discount_percent', 
            'collection_url',
            'photos'
        ]
class ProductSerializer(serializers.ModelSerializer):
    collections = CollectionSerializer(many=True, read_only=True)
    class Meta:
        model = Products
        fields = [
            'id', 
            'title', 
            'country_prod', 
            'category', 
            'pdf', 
            'collections'
        ]
    