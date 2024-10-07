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
from tastypie import fields
from django.db import connection
from django.http import JsonResponse

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
        allowed_methods = ['get']

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

class SearchResource(Resource):

    class Meta:
        resource_name = 'items'
        allowed_methods = ['get']

    def get_list(self, request, **kwargs):
        
        sql_query = """
            SELECT
          p.id AS product_id,
          p.title,
          p.country_prod,
          p.category,
          p.pdf,
          c.id AS collection_id,
          c.name AS collection_name,
          c.price,
          c.discount_price,
          c.discount_percent,
          ph.id AS photo_id,
          ph.filename,
          ph.path
        FROM
          products p
        LEFT JOIN
          collections c ON p.id = c.product_id
        LEFT JOIN
          photos ph ON c.id = ph.collection_id
        ORDER BY
          p.id, c.id, ph.id;
        """
        
        # SQL запрос в базу
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()

       # формируем JSON для фронта
        products = {}
        for row in rows:
            product_id = row[0]

            # проверяем, если продукт уже в словаре
            if product_id not in products:
                products[product_id] = {
                    'id': product_id,
                    'title': row[1],
                    'country_prod': row[2],
                    'category': row[3],
                    'pdf': row[4],
                    'collections': []
                }

            # обрабатываем коллекцию
            collection_id = row[5]
            if collection_id:
                collections = products[product_id]['collections']
                collection = next((col for col in collections if col['id'] == collection_id), None)
                
                if not collection:
                    collection = {
                        'id': collection_id,
                        'name': row[6],
                        'price': row[7],
                        'discount_price': row[8],
                        'discount_percent': row[9],
                        'photos': []
                    }
                    collections.append(collection)

                # обрабатываем фотографии
                photo_id = row[10]
                if photo_id:
                    collection['photos'].append({
                        'id': photo_id,
                        'filename': row[11],
                        'path': row[12]
                    })

        # преобразуем результат в список
        result = list(products.values())

        
        return JsonResponse(result, safe=False)
