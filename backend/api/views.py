import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from shop.models import Banners, Customers, Seolinks
from .serializers import BannersMainSerializer, CustomersMainSerializer, TelegramMessageSerializer, ProductSerializer
from django.conf import settings
from django.db.models import Prefetch
from shop.models import Products, Collections, Photos

class MainPageView(APIView):
    def get(self, request):
        banners = Banners.objects.all()
        customers = Customers.objects.all()

        data = {
            'banners': BannersMainSerializer(banners, many=True).data,
            'customers':CustomersMainSerializer(customers, many=True).data
        }

        return Response(data, status=status.HTTP_200_OK)
    
class SitemapView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            data = Seolinks.get_sitemap_data()
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class TelegramMessageView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TelegramMessageSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                {'error': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            response = requests.post(
                f'https://api.telegram.org/bot{settings.BOT_TOKEN}/sendMessage',
                json={
                    'chat_id': settings.CHAT_ID,
                    'text': serializer.validated_data['message'],
                }
            )
            
            response.raise_for_status()
            return Response(
                {'success': 'Message sent successfully'}, 
                status=status.HTTP_201_CREATED
            )
            
        except requests.RequestException as e:
            return Response(
                {'error': f'Failed to send message: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SearchView(APIView):
    def get(self, request):
        try:
            products = Products.objects.all()
            
            # Отладочный вывод
            for product in products:
                print(f"Product: {product.title}")
                for collection in product.collections.all():
                    print(f"  Collection: {collection.name}")
                    print(f"  Fields: {collection.__dict__}")
            
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )