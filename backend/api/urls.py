from django.urls import path
from .views import (
    MainPageView,
    SitemapView,
    TelegramMessageView,
    SearchView
)

urlpatterns = [
    path("v1/main/", MainPageView.as_view(), name="main_page"),
    path("v1/sitemap/", SitemapView.as_view(),name="seolinks"),
    path("v1/send-message/", TelegramMessageView.as_view(), name="send_message"),
    path("v1/items/", SearchView.as_view(), name="search"),
]
