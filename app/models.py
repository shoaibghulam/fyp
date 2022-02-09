from django.db import models
from django.utils import timezone

# Create your models here.
class AdminModel(models.Model):
    AdminID = models.AutoField(primary_key=True)
    FullName=models.CharField(max_length=250)
    Email=models.CharField(max_length=250)
    Password= models.TextField(max_length=1500)
    ContactNo=models.CharField(max_length=250)
    Token= models.CharField(max_length=100,default="none")
    Status= models.BooleanField(default=False) 
    RegistrationDate =models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.FullName

# UserAccount
class UserModel(models.Model):
    UserId= models.AutoField(primary_key=True)
    FirstName= models.CharField(max_length=200)
    LastName= models.CharField(max_length=200)
    Email= models.CharField(max_length=200)
    ContactNo= models.CharField(max_length=200) 
    Address= models.CharField(max_length=250)
    Password= models.TextField(max_length=2000)
    Token= models.CharField(max_length=100)
    Status= models.CharField(max_length=100,default="pending") 
    RegistrationDate =models.DateTimeField(default=timezone.now)

  
    


class VendorModel(models.Model):
    VendorId = models.AutoField(primary_key=True)
    AgencyName=models.CharField(max_length=250)
    Username =models.CharField(max_length=250)
    Email=models.CharField(max_length=250)
    Password= models.TextField(max_length=1500)
    ContactNo=models.CharField(max_length=250)
    Address =models.TextField(max_length=550)
    Status= models.CharField(max_length=100,default="pending") 
    RegistrationDate =models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.AgencyName

class DataModels(models.Model):
    ModalId=models.AutoField(primary_key=True)
    ModalTitle=models.CharField(max_length=250) 
    ModalDescription= models.TextField(max_length=2500)
    ModalThumbnail= models.ImageField(upload_to="modal/") 
    def __str__(self):
        return self.ModalTitle


class LocationModel(models.Model):
    LocationId= models.AutoField(primary_key=True)
    LocationTitle=models.CharField(max_length=250) 
    Lititude =models.FloatField(default=0)
    Longitude =models.FloatField(default=0)
    ContactNo =models.CharField(max_length=250)
    Description=models.TextField(max_length=2500)
    Address =models.CharField(max_length=250)
    WebsiteLink =models.CharField(max_length=250)
    Status= models.CharField(max_length=100,default="pending") 
    ModalId=models.ForeignKey(DataModels, on_delete=models.CASCADE) 
    UserId=models.ForeignKey(VendorModel, on_delete=models.CASCADE) 
    def __str__(self):
        return self.LocationTitle

class WebisteModal(models.Model):
    WebsiteId=models.AutoField(primary_key=True)
    WebsiteTitle=models.CharField(max_length=250,default="Anti Medi Care")
    WebsiteDescription=models.TextField(max_length=500)
    WebsiteEmail=models.CharField(max_length=250,default="admin@fyp.com")
    WebsiteContactNo=models.CharField(max_length=200)
    

