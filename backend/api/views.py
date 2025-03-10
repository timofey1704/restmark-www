import datetime
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from shop.models import Banners, Customers
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

