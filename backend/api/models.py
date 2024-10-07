from django.db import models
from tastypie.resources import ModelResource
from tastypie.resources import Resource
from tastypie.exceptions import ImmediateHttpResponse
from tastypie.authorization import Authorization
from .authentication import CustomAuthentication
from shop.models import Banners, Customers, Texts, Products, Collections, Photos
import requests
from django.conf import settings
from tastypie.http import HttpBadRequest, HttpApplicationError

# Create your models here.
#todo список эндпоинтов:
# banners
# customers
# items?
# login?
# products
# sales
# send-message
# texts

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
        

class TelegramMessageResource(Resource):
    class Meta:
        resource_name = 'send-message'
        allowed_methods = ['post']
        authentication = CustomAuthentication()
        authorization = Authorization()

    def obj_create(self, bundle, **kwargs):
        message = bundle.data.get('message')

        if not message:
            raise ImmediateHttpResponse(
                self.create_response(bundle.request, {'error': 'No message provided'}, HttpBadRequest)
            )

        try:
            response = requests.post(
                f'https://api.telegram.org/bot{settings.BOT_TOKEN}/sendMessage',
                json={
                    'chat_id': settings.CHAT_ID,
                    'text': message,
                }
            )
            response.raise_for_status()
            return self.create_response(bundle.request, {'success': 'Message sent successfully'})
        except requests.RequestException as e:
            raise ImmediateHttpResponse(
                self.create_response(
                    bundle.request,
                    {'error': f'Failed to send message: {str(e)}'},
                    HttpApplicationError
                )
            )