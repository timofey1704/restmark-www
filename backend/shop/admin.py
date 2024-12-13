from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Products)
admin.site.register(models.Collections)
admin.site.register(models.Photos)

admin.site.register(models.Banners)
admin.site.register(models.Customers)
admin.site.register(models.Seolinks)
# admin.site.register(models.Texts)