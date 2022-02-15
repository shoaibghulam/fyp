
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
    

class ProductModelSer(serializers.ModelSerializer):
    ModalId=DataModelsSer(DataModels , many=False, read_only=True)
    UserId=VendorModelSer(VendorModel , many=False, read_only=True)
    class Meta:
        model = ProductModel
        fields = '__all__'
    
class OrderProductModelSer(serializers.ModelSerializer):
    ModalId=DataModelsSer(DataModels , many=False, read_only=True)
    
    class Meta:
        model = ProductModel
        fields = '__all__'
    


class WebisteModalSer(serializers.ModelSerializer):
    class Meta:
        model = WebisteModal
        fields = '__all__'
    


class OrderAddSer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'
class OrderSer(serializers.ModelSerializer):
    Product=ProductModelSer(ProductModel , many=False, read_only=True)
    class Meta:
        model = OrderModel
        fields = '__all__'
    