
from django.contrib import admin
from . import models

class CollectionInline(admin.TabularInline):
    model = models.Collections
    extra = 0
    fields = ('name', 'price', 'discount_price', 'discount_percent', 'collection_url')

class ProductAdmin(admin.ModelAdmin):
    inlines = [CollectionInline]
    list_display = ('title', 'category', 'country_prod')
    list_filter = ('category',)
    search_fields = ('title', 'category')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        return super().changeform_view(request, object_id, form_url, extra_context)

    def changelist_view(self, request, extra_context=None):
        return super().changelist_view(request, extra_context)

admin.site.register(models.Products, ProductAdmin)
admin.site.register(models.Photos)
admin.site.register(models.Banners)
admin.site.register(models.Customers)
admin.site.register(models.Seolinks)