
from rest_framework import serializers
from .models import *


class AdminModelSer(serializers.ModelSerializer):
    class Meta:
        model = AdminModel
        fields = '__all__'
    
class UserModelSer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
class VendorModelSer(serializers.ModelSerializer):
    class Meta:
        model = VendorModel
        fields = '__all__'
    

class DataModelsSer(serializers.ModelSerializer):
    class Meta:
        model = DataModels
        fields = '__all__'
    

class LocationModelSer(serializers.ModelSerializer):
    ModalId=DataModelsSer(DataModels , many=False, read_only=True)
    UserId=VendorModelSer(VendorModel , many=False, read_only=True)
    class Meta:
        model = LocationModel
        fields = '__all__'
    


class WebisteModalSer(serializers.ModelSerializer):
    class Meta:
        model = WebisteModal
        fields = '__all__'
    