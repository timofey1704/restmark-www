from django.contrib import admin
from django.urls import path, include
from api.models import BannersResource, CustomersResource, TelegramMessageResource, SearchResource, SitemapResource
from tastypie.api import Api
from django.conf import settings
from django.conf.urls.static import static

# #! подключаем эндпоинты
# api = Api(api_name='v1')
# banners_resource = BannersResource() # api/v1/banners
# customers_resource = CustomersResource() # api/v1/customers
# # texts_resource = TextsResource() # api/v1/texts
# send_message_resourse = TelegramMessageResource() #api/v1/send-message
# search_resource = SearchResource() #api/v1/items
# sitemap_resourse = SitemapResource() #api/v1/seolinks



# api.register(banners_resource)
# api.register(customers_resource)
# # api.register(texts_resource)
# api.register(send_message_resourse)
# api.register(search_resource)
# api.register(sitemap_resourse)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
