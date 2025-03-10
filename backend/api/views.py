import datetime
from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status
from shop.models import Banners, Customers, Seolinks
from .serializers import BannersMainSerializer, CustomersMainSerializer

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
            data = Seolinks.get_sitemap_data()  # используем тот же метод, что и раньше
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    

