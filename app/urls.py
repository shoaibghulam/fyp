
from os import name
from django.urls import path
from app.views import *
urlpatterns = [
 path('register', RegisterUser.as_view(),name="register"),
 path('register/<int:pk>', RegisterUser.as_view(),name="register"),
 path('login_vendor', LoginVendor.as_view(),name="login_vendor"),
 path('adminlogin', LoginAdmin.as_view(),name="adminlogin"),
 path('models',ModelView.as_view(),name="models"),
 path('models/<int:pk>',ModelView.as_view(),name="models"),
 path('locations',LocationViews.as_view(),name="locations"),
 path('locations/<int:pk>',LocationViews.as_view(),name="locations"),
 path('settings',SettingsViews.as_view(),name="settings"),
 path('locationstatus/<int:pk>',AdminStatus.as_view(),name="locationstatus"),
# ---------------Agency User Panel API Start
 path('agencylocation',LocationUserViews.as_view(),name="agencylocation"),
 path('agencylocation/<int:pk>',LocationUserViews.as_view(),name="agencylocation"),
 path('agencysettings',AgencySettingsViews.as_view(),name="agencysettings"),
 path('agencysettings/<int:pk>',AgencySettingsViews.as_view(),name="agencysettings"),


# ---------------Public API start
 path('allmodels',PublicModelView.as_view(),name="allmodels"),
 path('nearlocation',NearLocations.as_view(),name="nearlocation"),

# ---------------Public API end
# user Account start
path('userregister',UserRegister.as_view(),name="UserRegister"),
path('verify',VerifyClient.as_view(),name="verify"),
path('login',LoginUser.as_view(),name="login"),
path('order_now/<int:id>',OrderView.as_view(),name="order_now"),
path('order_now',OrderView.as_view(),name="order_now"),
path('vendor_orders',VendorOrders.as_view(),name="vendor_orders"),
path('vendor_orders/<int:pk>',VendorOrders.as_view(),name="vendor_orders"),
path('admin_orders',AdminOrders.as_view(),name="admin_orders"),

# user Account end
]
