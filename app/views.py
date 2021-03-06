from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from passlib.hash import django_pbkdf2_sha256 as hash
from app.serializer import *
from app.models import *
import jwt
import datetime
from django.db.models import Q
import requests 
import random 
import json
from django.core.mail import EmailMultiAlternatives
from math import radians, cos, sin, asin, sqrt
from decouple import config
import pusher

pusher_client = pusher.Pusher(
  app_id='1347586',
  key='197d770c643a357ecfcf',
  secret='8af2becad02f4919b398',
  cluster='ap2',
  ssl=True
)
tokenkey = config('jwttoken')

# Create your views here.
BASE="http://127.0.0.1:3000/"

def emailverify(subject,to,link,message):

    from_email="komaljan4@gmail.com"
        
        
    html_content = f'''
                <h1 style="text-align:center; font-family: 'Montserrat', sans-serif;">{message}</h1>
                    
                <div style='width:300px; margin:0 auto;'> <a href='{link}' style=" background-color:#0066ff; border: none;  color: white; padding: 15px 32px;  text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; font-family: PT Sans, sans-serif;" >click here</a>
            </div>
                '''

    msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def notificationEmail(subject,to,message):

    from_email="komaljan4@gmail.com"
        
        
    html_content = f'''
                <h1 style="text-align:center; font-family: 'Montserrat', sans-serif;">{subject}</h1>
                    
                <div style='width:100%; font-size:15px; margin:0 auto;'>
               <p> {message}</p>
            </div>
                '''

    msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()



def orderComplateEmail(subject,to,message):

    from_email="komaljan4@gmail.com"
        
        
    html_content = message

    msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()



class LoginVendor(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=VendorModel.objects.get(pk=my_token['id'])
                serData=VendorModelSer(data, many=False)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    def post(self, request , format=None):
        try: 
            loginQuery=VendorModel.objects.get(Username=request.data['Username'] , Status='active')
            if hash.verify(request.data['Password'],loginQuery.Password):
                print("NEO Data")
                access_token_payload = {
                'id': loginQuery.pk,
                'agencyName':loginQuery.AgencyName,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),

                }

                panel_token = jwt.encode(access_token_payload,tokenkey, algorithm='HS256').decode('utf-8')

                message = {'status':True,'message':'Login SuccessFully','token':panel_token,'user':{'agencyName':loginQuery.AgencyName,'id':loginQuery.pk}}
                return Response(message)

            else:
                message = {'status':False,'message':'Invalid Credential'}
                return Response(message)
        except:
          
            message = {'status':'false','message':'Invalid Credential'}
            return Response(message)
        # return Response({'data':'sucess'})

class RegisterUser(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=VendorModel.objects.all().order_by('-pk')
                serData=VendorModelSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    
    def post(self , request, format=None):
        checkAccount=VendorModel.objects.filter(Q(Username=request.data['Username'])| Q(Email=request.data['Email']))
      
        if checkAccount:
            message = {'status':False,'message':'Account Already Exist'}
            return Response(message)

        dataset={
            'AgencyName':request.data['AgencyName'],
            'Username':request.data['Username'],
            'Email':request.data['Email'],
            'ContactNo':request.data['ContactNo'],
            'Address':request.data['Address'],
            'Password':hash.hash(request.data['Password']),
           
        }
       
        serializer = VendorModelSer(data=dataset)
        if serializer.is_valid():
            serializer.save()
            message = {'status':True,'message':'Account has been Register SuccessFully'}
            return Response(message)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
    def put(self , request,pk, format=None):
       
      
        
        inst=VendorModel.objects.get(pk=pk)
        password=request.data['Password']
        if password == 'null':
            password=inst.Password
            dataset={
            'AgencyName':request.data['AgencyName'],
            'Username':request.data['Username'],
            'Email':request.data['Email'],
            'ContactNo':request.data['ContactNo'],
            'Address':request.data['Address'],
            'Password':inst.Password,
           
        }
            
        else:
            
            password=hash.hash(password)
            dataset={
            'AgencyName':request.data['AgencyName'],
            'Username':request.data['Username'],
            'Email':request.data['Email'],
            'ContactNo':request.data['ContactNo'],
            'Address':request.data['Address'],
            'Password':hash.hash(password),
           
            }
         
            
        dataset={
            'AgencyName':request.data['AgencyName'],
            'Username':request.data['Username'],
            'Email':request.data['Email'],
            'ContactNo':request.data['ContactNo'],
            'Address':request.data['Address'],
            'Password':password,
           
        }
        serializer = VendorModelSer(inst,data=dataset)
        if serializer.is_valid():
            serializer.save()
            message = {'status':True,'message':'Account has been Updated SuccessFully'}
            return Response(message)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self , request,pk, format=None):
       
        data=VendorModel.objects.get(pk=pk)
             
        if data:
            data.delete()
            message = {'status':True,'message':'Account has been Deleted SuccessFully'}
            return Response(message)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------Modal Sections start-----------------------
class ModelView(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=DataModels.objects.all().order_by('-pk')
                serData=DataModelsSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})

    def post(self, request, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                checkModal=DataModels.objects.filter(Q(ModalTitle=request.data['ModalTitle']))
                
                if checkModal:
                    message = {'status':False,'message':'Modal Already Exist'}
                    return Response(message)
                serializer = DataModelsSer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    message = {'status':True,'message':'data has been Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
   
   
    def put(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            img=request.data['ModalThumbnail']
            if my_token:
                id = DataModels.objects.get(pk=pk)
                print("nnn",request.data['ModalThumbnail'])
                if request.data['ModalThumbnail']== 'null':
                    img=id.ModalThumbnail
                data={
                    'ModalTitle':request.data['ModalTitle'],
                    'ModalDescription':request.data['ModalDescription'],
                    
                    'ModalThumbnail':img,
                }
                print(data)
                serializer = DataModelsSer(id,data=data)
                if serializer.is_valid():
                    serializer.save()
                    message = {'status':True,'message':'data has been update Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
        

    def delete(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                data = DataModels.objects.get(pk=pk)
              
                serializer = DataModelsSer(id,data=data)
                if data:
                    data.delete()
                    message = {'status':True,'message':'data has been Deleted Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
        
# -----------------------Modal Sections end-------------------------
# -----------------------Loction Sections start-------------------------
class LocationViews(APIView):
    # dddd
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                modaldata=DataModels.objects.all().order_by('-pk')
                serModal=DataModelsSer(modaldata, many=True)
                data=ProductModel.objects.all().order_by('-pk')
                serData=ProductModelSer(data, many=True)
                return Response({'status':True,'data':serData.data,'model':serModal.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})


    def post(self, request, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                print(request.data)
                data=ProductModel(
                    ProductTitle=request.data['LocationTitle'],
                    Lititude=request.data['Lititude'],
                    Longitude=request.data['Longitude'],
                    ContactNo=request.data['ContactNo'],
                    Description=request.data['Description'],
                    Address=request.data['Address'],
                    Price=request.data['Price'],
                    qty=request.data['qty'],
                    WebsiteLink=request.data['WebsiteLink'],
                    ModalId=DataModels.objects.get(pk=request.data['ModalId']),
                    UserId=VendorModel.objects.get(pk=11)
                ) 
               
                data.save()
                if data:
                    
                    message = {'status':True,'message':'Location has been Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
  
    def put(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=ProductModel.objects.get(pk=pk)
              
                
                data.LocationTitle=request.data['LocationTitle']
                data.Lititude=request.data['Lititude']
                data.Longitude=request.data['Longitude']
                data.ContactNo=request.data['ContactNo']
                data.Description=request.data['Description']
                data.Address=request.data['Address']
                data.WebsiteLink=request.data['WebsiteLink']
                data.ModalId=DataModels.objects.get(pk=request.data['ModalId'])
                data.UserId=VendorModel.objects.get(pk=11)
                
               
                data.save()
                if data:
                    
                    message = {'status':True,'message':'Location has been Successfully updated'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})

    def delete(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                data = ProductModel.objects.get(pk=pk)
              
                serializer = ProductModelSer(id,data=data)
                if data:
                    data.delete()
                    message = {'status':True,'message':'data has been Deleted Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
   
   
# -----------------------Loction Sections end-------------------------

# -----------------------setting Sections start-------------------------
class SettingsViews(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
             
                adminData=AdminModel.objects.get(pk=my_token['id'])
                adminSer=AdminModelSer(adminData, many=False)
                data=WebisteModal.objects.all().first()
                serData=WebisteModalSer(data, many=False)
                return Response({'status':True,'data':serData.data,'userData':adminSer.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})


    def put(self,request , format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                msg=""
                data=AdminModel.objects.get(pk=my_token['id'])
                if(request.data['tab']=="general"):
                    data.FullName=request.data['FullName']
                    data.Email=request.data['Email']
                    data.ContactNo=request.data['ContactNo']
                    msg="General Information is been successfuly updated"
                elif request.data['tab']=="changepassword":
                    if hash.verify(request.data['OldPassword'],data.Password):
                         data.Password=hash.hash(request.data['NewPassowrd'])
                         msg="Password has been updated successfully"
                    else:
                         message = {'status':False,'message':'Please Enter Correct Old Password'}
                         return Response(message)

                data.save()
         
                message = {'status':True,'message':msg}
                return Response(message)
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})


# -----------------------setting Sections end-------------------------




##Token Expire
def tokenauth(tokencatch):

    try:
        my_token = jwt.decode(tokencatch,tokenkey, algorithms=["HS256"])
        return my_token


    except jwt.ExpiredSignatureError:
        return False

    except:
        return False
# -------------------------------------------------

class LoginAdmin(APIView):
    def post(self, request , format=None, *args, **kwargs):
        try:
            loginQuery=AdminModel.objects.get(Email=request.data['Email'])
            request.session['userid']=loginQuery.pk
            if hash.verify(request.data['Password'],loginQuery.Password):
                access_token_payload = {
                'id': loginQuery.pk,
                'fullname':loginQuery.FullName,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),

                }
                access_token = jwt.encode(access_token_payload,tokenkey, algorithm='HS256').decode('utf-8')
             

                message = {'status':True,'message':'Login SuccessFully','token':access_token,'user':{'name':loginQuery.FullName,'id':loginQuery.pk}}
                return Response(message)

            else:
                message = {'status':False,'message':'Invalid Credential'}
                return Response(message)
        except:
            print("not")
            message = {'status':'false','message':'Invalid Credential'}
            return Response(message)
        # return Response({'data':'sucess'})



#----------------------------------- Location status---------
class AdminStatus(APIView):
    def put(self, request, pk ,format=None):
       
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                if request.data['tab']=="locationstatus":
                   

                    data = ProductModel.objects.get(pk=pk)
                  
                    if data:
                    
                        data.Status=request.data['status']
                        data.save()
                        message = {'status':True,'message':'Status has been change Successfully'}
                        return Response(message)
                elif request.data['tab']=="userstaus":
                        data = VendorModel.objects.get(pk=pk)
                       
                
                        if data:
                        
                            data.Status=request.data['status']
                            data.save()
                            message = {'status':True,'message':'Status has been change Successfully'}
                            return Response(message)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})


# ------------------Agencys location Data start-------------
# -----------------------Loction Sections start-------------------------
class LocationUserViews(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=ProductModel.objects.filter(UserId=my_token['id']).order_by('-pk')
                serData=ProductModelSer(data, many=True)
                modaldata=DataModels.objects.all().order_by('-pk')
                serModal=DataModelsSer(modaldata, many=True)
                return Response({'status':True,'data':serData.data,'model':serModal.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            
            return Response({'status':False,'message':str(e)})

    def post(self, request, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                print("my life is hre")
                data=ProductModel(
                    ProductTitle=request.data['LocationTitle'],
                    Lititude=request.data['Lititude'],
                    Longitude=request.data['Longitude'],
                    ContactNo=request.data['ContactNo'],
                    Description=request.data['Description'],
                    Address=request.data['Address'],
                    Price=request.data['Price'],
                    qty=request.data['qty'],
                    WebsiteLink=request.data['WebsiteLink'],
                    ModalId=DataModels.objects.get(pk=request.data['ModalId']),
                    UserId=VendorModel.objects.get(pk=my_token['id'])
                ) 
               
                data.save()
                if data:
                    
                    message = {'status':True,'message':'Location has been Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
  
    def put(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=ProductModel.objects.get(pk=pk)
              
                
                data.LocationTitle=request.data['LocationTitle']
                data.Lititude=request.data['Lititude']
                data.Longitude=request.data['Longitude']
                data.ContactNo=request.data['ContactNo']
                data.Description=request.data['Description']
                data.Address=request.data['Address']
                data.WebsiteLink=request.data['WebsiteLink']
                data.ModalId=DataModels.objects.get(pk=request.data['ModalId'])
                data.UserId=VendorModel.objects.get(pk=my_token['id'])
                
               
                data.save()
                if data:
                    
                    message = {'status':True,'message':'Location has been Successfully updated'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})

    def delete(self, request,pk, format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                data = ProductModel.objects.get(pk=pk)
              
                serializer = ProductModelSer(id,data=data)
                if data:
                    data.delete()
                    message = {'status':True,'message':'data has been Deleted Successfully'}
                    return Response(message)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})
   
   
# -----------------------Loction Sections end-------------------------
# ------------------Agencys location Data end-------------

# -----------------------setting Sections start-------------------------
class AgencySettingsViews(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                
                userData=VendorModel.objects.get(pk=my_token['id'])
                userdata=VendorModelSer(userData, many=False)
                
                return Response({'status':True,'data':userdata.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})


    def put(self,request , format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                msg=""
                data=VendorModel.objects.get(pk=my_token['id'])
                if(request.data['tab']=="general"):
                    data.AgencyName=request.data['FullName']
                    data.Email=request.data['Email']
                    data.ContactNo=request.data['ContactNo']
                    msg="General Information is been successfuly updated"
                elif request.data['tab']=="changepassword":
                    if hash.verify(request.data['OldPassword'],data.Password):
                         data.Password=hash.hash(request.data['NewPassowrd'])
                         msg="Password has been updated successfully"
                    else:
                         message = {'status':False,'message':'Please Enter Correct Old Password'}
                         return Response(message)

                data.save()
         
                message = {'status':True,'message':msg}
                return Response(message)
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})


# -----------------------setting Sections end-------------------------


# -----------------------Public API Start-------------------------
class PublicModelView(APIView):
    def get(self,request):
        try:
            data=DataModels.objects.all().order_by('-pk')
            serData=DataModelsSer(data, many=True)
            return Response({'status':True,'data':serData.data})
        

        except Exception as e:
         return Response({'status':False,'message':str(e)})

# -----------------------Public API end-------------------------




class NearLocations(APIView):
    def post(self, request, format=None):
        print("the data is ",request.data)
        id=int(request.data['id'])
        lat=float(request.data['lat'])
        lon=float(request.data['lng'])
        # lat2=24.90528159995955
        # lon2=67.11237083775545
        nearLocations=list()
        data=ProductModel.objects.filter(ModalId=id, Status="active")
       
        for mydata in data:
            nearDistance=dist(lat,lon,mydata.Lititude,mydata.Longitude)
            if nearDistance <=10:
                serData=ProductModelSer(mydata)
                nearLocations.append(serData.data)
                # print("location is ",json.dumps(nearDistance))

        
        return HttpResponse(json.dumps(nearLocations))

      


def dist(lat1, long1, lat2, long2):
    
    # convert decimal degrees to radians 
    lat1, long1, lat2, long2 = map(radians, [lat1, long1, lat2, long2])
    # haversine formula 
    dlon = long2 - long1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    # Radius of earth in kilometers is 6371
    km = 6371* c
    return km
    # loc=sqrt(((lat1-lat2)**2)+((long1-long2)**2))
    # return loc


class UserRegister(APIView):
    def post(self,request,  format=None):
        checkAccount=UserModel.objects.filter(Email=request.data['Email'])
      
        if checkAccount:
            message = {'status':False,'message':'Account Already Exist'}
            return Response(message)


        token=random.randint(1,5000)

        dataset={
            'FirstName':request.data['FirstName'],
            'LastName':request.data['LastName'],
            'Email':request.data['Email'],
            'ContactNo':request.data['ContactNo'],
            'Address':request.data['Address'],
            'Password':hash.hash(request.data['Password']),
            'Token':token,
           
        }
       
        serializer = UserModelSer(data=dataset)
        if serializer.is_valid():
            serializer.save()
            responsemessage = {'status':True,'message':'Account has been Register SuccessFully'}
         
            subject="Please Verify Your Accounts"
            id=serializer.data['UserId']
            to=serializer.data['Email']
            token=serializer.data['Token']
            link=f"{BASE}/verify/{token}/{id}"
            message=f"Hi, {serializer.data['FirstName']} Please Verify Your Account"
            emailverify(subject,to,link,message)
            return Response(responsemessage)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  




class LoginClient(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=UserModel.objects.get(pk=my_token['id'])
                serData=UserModelSer(data, many=False)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    def post(self, request , format=None):
        try: 
            loginQuery=UserModel.objects.get(Email=request.data['Email'] , Status='active')
            if hash.verify(request.data['Password'],loginQuery.Password):
                print("NEO Data")
                access_token_payload = {
                'id': loginQuery.pk,
                'name':f"{loginQuery.FirstName} {loginQuery.LastName}",
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),

                }

                access_token = jwt.encode(access_token_payload,tokenkey, algorithm='HS256').decode('utf-8')

                message = {'status':True,'message':'Login SuccessFully','token':access_token,'user':{'name':f"{loginQuery.FirstName} {loginQuery.LastName}",'id':loginQuery.pk}}
                return Response(message)

            else:
                message = {'status':False,'message':'Invalid Credential'}
                return Response(message)
        except:
          
            message = {'status':'false','message':'Invalid Credential'}
            return Response(message)
        # return Response({'data':'sucess'})


class VerifyClient(APIView):
    def post(self, request, format=None):
        data=UserModel.objects.get(pk=request.data['id'])
        if data.Token == request.data['token']:
            data.Status='enable'
            data.Token="None"
            data.save()
            message = {'message':'Your Account has been Verify'}
            return Response(message)
        else:
            message = {'message':'Account is already verify'}
            return Response(message)
            

class LoginUser(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=VendorModel.objects.get(pk=my_token['id'])
                serData=VendorModelSer(data, many=False)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    def post(self, request , format=None):
        try: 
            loginQuery=UserModel.objects.get(Email=request.data['Email'] , Status='active')
            if hash.verify(request.data['Password'],loginQuery.Password):
               
                access_token_payload = {
                'id': loginQuery.pk,
                'name':loginQuery.FirstName,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),

                }

                access_token = jwt.encode(access_token_payload,tokenkey, algorithm='HS256').decode('utf-8')

                message = {'status':True,'message':'Login SuccessFully','token':access_token,'user':{'FullName':f"{loginQuery.FirstName} {loginQuery.LastName}",'id':loginQuery.pk}}
                return Response(message)

            else:
                message = {'status':False,'message':'Invalid Credential'}
                return Response(message)
        except:
          
            message = {'status':'false','message':'Invalid Credential'}
            return Response(message)
        # return Response({'data':'sucess'})



class OrderView(APIView):
    def get(self, request , id):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=ProductModel.objects.get(pk=id)
                serData=OrderProductModelSer(data, many=False)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})

    def post(self,request,  format=None):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            print(request.data)
            if my_token:
                
                dataset={
                'FirstName':request.data['FirstName'],
                'LastName':request.data['LastName'],
                'Email':request.data['Email'],
                'ContactNo':request.data['ContactNo'],
                'Address':request.data['Address'],
                'Product':request.data['Product'],
                'Price':float(request.data['Price']),
                'Qty':int(request.data['Qty']),
                'TotalPrice':float(request.data['TotalPrice']),
                'User':my_token['id'],

                }
                
       
                serializer = OrderAddSer(data=dataset)
                # print(dataset)
                if serializer.is_valid():
                    serializer.save()
                    data=serializer.validated_data['Product']
                    print("the data about ser is",data.UserId.VendorId)
                   
                    channel=f"user{data.UserId.VendorId}"
                    print("the channel is",channel)
                    pusher_client.trigger(channel, 'my-event', {'message':"hello"})
                    message = {'status':True,'message':'Your order has been Add Sucessfully. we will contact you soon'}
                
                    return Response(message)
                else:
                    print("the error is")
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            

            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            print("the e is",e)
            return Response({'status':False,'message':str(e)})

       

class VendorOrders(APIView):
     def get(self, request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                print("My token is",my_token)
                data=OrderModel.objects.filter(Product__UserId=my_token['id']).order_by('-pk')
                serData=OrderSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    
     def put(self, request, pk ,format=None):
       
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                if request.data['tab']=="locationstatus":
                   

                    data = OrderModel.objects.get(pk=pk)
                  
                    if data.Status !="Cancel":
                    
                        data.Status=request.data['status']
                        data.save()
                        if data.Status=="Accepted":
                            subject=f"Order Id {data.pk} has been accepted"
                            msg=f'''
                                <html>

<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
  
  <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">
 
    <thead>

      <tr>
        <th style="text-align:left;">Anti Medi care Order Accepted</th>
        <th style="text-align:right;font-weight:400;">{data.Date}</th>
      </tr>
      <tr>
      <td colspan="2">Your Order has been accpeted pleaser vist our Office to Complate your Order Process. <br/><b>Note: If process is not Complate the order has been cancel after 6 hours</b></td>
      </tr>
    </thead>
   
    <tbody>
      <tr>
        <td style="height:35px;"></td>
      </tr>
      <tr>
        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
          <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">Accepted</b></p>
          <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">ORDER ID</span> {data.pk}</p>
          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> Rs. {data.TotalPrice}</p>
          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Vendor </span> {data.Product.UserId.AgencyName}</p>
        </td>
      </tr>
      <tr>
        <td style="height:35px;"></td>
      </tr>
      <tr>
        <td style="width:50%;padding:20px;vertical-align:top">
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> {data.FirstName} {data.LastName}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> {data.Email}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> {data.ContactNo}</p>
         
        </td>
        <td style="width:50%;padding:20px;vertical-align:top">
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> {data.Address}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Qty</span> {data.Qty}</p>
         
        </td>
      </tr>
     
    
    </tbody>
    <tfooter>
      <tr>
        <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
          <strong style="display:block;margin:0 0 10px 0;">Regards</strong> {data.Product.UserId.AgencyName}<br> {data.Product.UserId.Address}<br><br>
          <b>Phone:</b> {data.Product.UserId.ContactNo}<br>
          <b>Email:</b> {data.Product.UserId.Email}
        </td>
      </tr>
    </tfooter>
  </table>
</body>

</html>
                            '''
                            
                            notificationEmail(subject,data.Email,msg)
                        elif data.Status =="Completed":
                            msg=f'''
                                <html>

<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
  <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">
    <thead>
      <tr>
        <th style="text-align:left;">Anti Medi care</th>
        <th style="text-align:right;font-weight:400;">{data.Date}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="height:35px;"></td>
      </tr>
      <tr>
        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
          <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">Success</b></p>
          <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">ORDER ID</span> {data.pk}</p>
          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> Rs. {data.TotalPrice}</p>
          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Vendor </span> {data.Product.UserId.AgencyName}</p>
        </td>
      </tr>
      <tr>
        <td style="height:35px;"></td>
      </tr>
      <tr>
        <td style="width:50%;padding:20px;vertical-align:top">
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> {data.FirstName} {data.LastName}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> {data.Email}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> {data.ContactNo}</p>
         
        </td>
        <td style="width:50%;padding:20px;vertical-align:top">
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> {data.Address}</p>
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Qty</span> {data.Qty}</p>
         
        </td>
      </tr>
     
    
    </tbody>
    <tfooter>
      <tr>
        <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
          <strong style="display:block;margin:0 0 10px 0;">Regards</strong> {data.Product.UserId.AgencyName}<br> {data.Product.UserId.Address}<br><br>
          <b>Phone:</b> {data.Product.UserId.ContactNo}<br>
          <b>Email:</b> {data.Product.UserId.Email}
        </td>
      </tr>
    </tfooter>
  </table>
</body>

</html>
                            '''
                            orderComplateEmail("Order Completed",data.Email,msg)
                      
                      
                        elif data.Status=="Cancel":
                            subject=f"Order Id {data.pk} has been Cancel"
                            message=f"Dear {data.FirstName} {data.LastName} your order {data.Product.ProductTitle} has been Cancel."
                            notificationEmail(subject,data.Email,message)
                            updateqty=ProductModel.objects.get(pk=data.Product.pk)
                            updateqty.qty=updateqty.qty + data.Qty
                            updateqty.save()
                      
                      
                        message = {'status':True,'message':'Status has been change Successfully'}
                        return Response(message)

                    else:
                        message = {'status':True,'message':'Order is Already been canceled'}
                        return Response(message)



            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})


class AdminOrders(APIView):
     def get(self, request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
             
                data=OrderModel.objects.all().order_by('-pk')
                serData=OrderSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    
     def put(self, request, pk ,format=None):
       
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
           
            if my_token:
                if request.data['tab']=="locationstatus":
                   

                    data = OrderModel.objects.get(pk=pk)
                  
                    if data:
                    
                        data.Status=request.data['status']
                        data.save()
                        #  notificationEmail(subject,to,message):
                       
                        
                        message = {'status':True,'message':'Status has been change Successfully'}
                        return Response(message)
               


            else:
                return Response({'status':False,'message':'token is expire'})

        except Exception as e:
            return Response({'status':False,'message':str(e)})


  