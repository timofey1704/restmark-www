from tastypie.authentication import ApiKeyAuthentication

class CustomAuthentication(ApiKeyAuthentication):
     def is_authenticated(self, request, **kwargs):
          if request.method == 'GET': #если фронт отправляет гет запрос, то он пройдет. Если запрос не GET, то 403
              return True
          return super().is_authenticated(request, **kwargs)