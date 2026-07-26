from django.contrib import admin
from .models import *
# Register your models here.


class UserModelAdmin(admin.ModelAdmin):
    exclude = ('Password', 'Token')
    list_display = ('UserId', 'FirstName', 'LastName', 'Email', 'Status')


class VendorModelAdmin(admin.ModelAdmin):
    exclude = ('Password',)
    list_display = ('VendorId', 'AgencyName', 'Username', 'Email', 'Status')


class AdminModelAdmin(admin.ModelAdmin):
    exclude = ('Password', 'Token')
    list_display = ('AdminID', 'FullName', 'Email', 'Status')


admin.site.register(UserModel, UserModelAdmin)
admin.site.register(VendorModel, VendorModelAdmin)
admin.site.register(AdminModel, AdminModelAdmin)
admin.site.register(DataModels)
admin.site.register(ProductModel)
admin.site.register(WebisteModal)
admin.site.register(OrderModel)
