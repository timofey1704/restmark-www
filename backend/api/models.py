# from tastypie.resources import Resource
# from tastypie.exceptions import ImmediateHttpResponse
# from tastypie.authorization import Authorization
# from tastypie.http import HttpBadRequest
# from django.db import connection
# from django.http import JsonResponse

# class SearchResource(Resource):
#     class Meta:
#         resource_name = 'items'
#         allowed_methods = ['get']
#         authorization = Authorization()

#     def get_list(self, request, **kwargs):
        
#         sql_query = """
#             SELECT
#               p.id AS product_id,
#               p.title,
#               p.country_prod,
#               p.category,
#               p.pdf,
#               p.order,
#               c.id AS collection_id,
#               c.name AS collection_name,
#               c.price,
#               c.discount_price,
#               c.discount_percent,
#               c.collection_url,
#               ph.id AS photo_id,
#               ph.filename,
#               ph.path
#             FROM
#               products p
#             LEFT JOIN
#               collections c ON p.id = c.product_id
#             LEFT JOIN
#               photos ph ON c.id = ph.collection_id
#             ORDER BY
#               p.order, p.id, c.order, c.id, ph.id;
#         """
        
#         # SQL запрос в базу
#         with connection.cursor() as cursor:
#             cursor.execute(sql_query)
#             rows = cursor.fetchall()

#        # формируем JSON для фронта
#         products = {}
#         for row in rows:
#             product_id = row[0]

#             # проверяем, если продукт уже в словаре
#             if product_id not in products:
#                 products[product_id] = {
#                     'id': product_id,
#                     'title': row[1],
#                     'country_prod': row[2],
#                     'category': row[3],
#                     'pdf': row[4],
#                     'collections': []
#                 }

#             # обрабатываем коллекцию
#             collection_id = row[5]
#             if collection_id:
#                 collections = products[product_id]['collections']
#                 collection = next((col for col in collections if col['id'] == collection_id), None)
                
#                 if not collection:
#                     collection = {
#                         'id': collection_id,
#                         'name': row[6],
#                         'price': row[7],
#                         'discount_price': row[8],
#                         'discount_percent': row[9],
#                         'collection_url': row[10],
#                         'photos': []
#                     }
#                     collections.append(collection)

#                 # обрабатываем фотографии
#                 photo_id = row[11]
#                 if photo_id:
#                     collection['photos'].append({
#                         'id': photo_id,
#                         'filename': row[12],
#                         'path': row[13]
#                     })

#         # преобразуем результат в список
#         result = list(products.values())

        
#         return JsonResponse(result, safe=False)

#     def obj_create(self, bundle, **kwargs):
#         try:
#             updated_items = bundle.data.get('updatedItems', [])
            
#             # обновляем порядок для продуктов
#             with connection.cursor() as cursor:
#                 for item in updated_items:
#                     product_id = item[0]
                  
                    
#                     cursor.execute(
#                         """
#                         UPDATE products 
#                         SET "order" = %s 
#                         WHERE id = %s
#                         """,
#                         [product_id]
#                     )
            
#             return self.create_response(bundle.request, {'status': 'success'})
#         except Exception as e:
#             raise ImmediateHttpResponse(HttpBadRequest(str(e)))

#     def create_response(self, request, data):
#         return self.get_list(request)
