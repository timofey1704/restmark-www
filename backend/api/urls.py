from django.urls import path
from .views import (
    MainPageView
)

urlpatterns = [
    path("v1/main", MainPageView.as_view(), name="main_page")
]
