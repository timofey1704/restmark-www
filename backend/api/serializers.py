from rest_framework import serializers
from shop.models import Banners, Customers, Seolinks
from django.db.utils import IntegrityError
from django.db.models import Avg


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