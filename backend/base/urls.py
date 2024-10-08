"""
URL configuration for base project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.models import BannersResource, CustomersResource, TelegramMessageResource, SearchResource
from tastypie.api import Api
from django.conf import settings
from django.conf.urls.static import static

#! подключаем эндпоинты
api = Api(api_name='v1')
banners_resource = BannersResource() # api/v1/banners
customers_resource = CustomersResource() # api/v1/customers
# texts_resource = TextsResource() # api/v1/texts
send_message_resourse = TelegramMessageResource() #api/v1/send-message
search_resource = SearchResource() #api/v1/items



api.register(banners_resource)
api.register(customers_resource)
# api.register(texts_resource)
api.register(send_message_resourse)
api.register(search_resource)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
