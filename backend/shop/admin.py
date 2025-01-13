from django.contrib import admin
from . import models

class CollectionInline(admin.TabularInline):  # StackedInline -- табличный вид
    model = models.Collections
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    inlines = [CollectionInline]
    list_display = ('title', 'category', 'country_prod')
    list_filter = ('category',)
    search_fields = ('title', 'category')


admin.site.register(models.Products, ProductAdmin)
admin.site.register(models.Photos)
admin.site.register(models.Banners)
admin.site.register(models.Customers)
admin.site.register(models.Seolinks)