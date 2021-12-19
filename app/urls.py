
from os import name
from django.urls import path
from app.views import *
urlpatterns = [
 path('register', RegisterUser.as_view(),name="register"),
 path('login', LoginUser.as_view(),name="login"),
 path('adminlogin', LoginAdmin.as_view(),name="adminlogin"),
 path('models',ModelView.as_view(),name="models"),
 path('locations',LocationViews.as_view(),name="locations"),
 path('settings',SettingsViews.as_view(),name="settings"),
# ---------------Agency User Panel API Start
 path('agencylocation',LocationUserViews.as_view(),name="agencylocation"),

]
