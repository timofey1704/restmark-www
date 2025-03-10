from django.urls import path
from .views import (
    MainPageView,
    SitemapView
)

urlpatterns = [
    path("v1/main/", MainPageView.as_view(), name="main_page"),
    path("v1/sitemap/", SitemapView.as_view(),name="seolinks")
]
