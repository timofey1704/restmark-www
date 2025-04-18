from django.contrib import admin
from . import models
from adminsortable2.admin import SortableInlineAdminMixin, SortableAdminMixin

class CollectionInline(SortableInlineAdminMixin, admin.TabularInline):
    model = models.Collections
    extra = 0
    fields = ('name', 'price', 'discount_price', 'discount_percent', 'collection_url', 'order')
    ordering = ['order']

@admin.register(models.Products)
class ProductsAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = [CollectionInline]
    list_display = ['title', 'category', 'order']
    list_filter = ['category']
    search_fields = ['title']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        return super().changeform_view(request, object_id, form_url, extra_context)

    def changelist_view(self, request, extra_context=None):
        return super().changelist_view(request, extra_context)

admin.site.register(models.Photos)
admin.site.register(models.Banners)
admin.site.register(models.Customers)
admin.site.register(models.Seolinks)