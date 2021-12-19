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

from decouple import config
tokenkey = config('jwttoken')

# Create your views here.



class LoginUser(APIView):
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
            loginQuery=UserModel.objects.get(Username=request.data['Username'] , Status=True)
            if hash.verify(request.data['Password'],loginQuery.Password):
                access_token_payload = {
                'id': loginQuery.pk,
                'agencyName':loginQuery.AgencyName,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),

                }

                access_token = jwt.encode(access_token_payload,tokenkey, algorithm='HS256').decode('utf-8')

                message = {'status':True,'message':'Login SuccessFully','token':access_token,'user':{'agencyName':loginQuery.AgencyName,'id':loginQuery.pk}}
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
                data=UserModel.objects.all().order_by('-pk')
                serData=UserModelSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
    
    def post(self , request, format=None):
        checkAccount=UserModel.objects.filter(Q(Username=request.data['Username'])| Q(Email=request.data['Email']))
      
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
        serializer = UserModelSer(data=dataset)
        if serializer.is_valid():
            serializer.save()
            message = {'status':True,'message':'Account has been Register SuccessFully'}
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
        
# -----------------------Modal Sections end-------------------------
# -----------------------Loction Sections start-------------------------
class LocationViews(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=LocationModel.objects.all().order_by('-pk')
                serData=LocationModelSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
# -----------------------Loction Sections end-------------------------

# -----------------------Loction Sections start-------------------------
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
# -----------------------Loction Sections end-------------------------




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



# ------------------Agencys location Data start-------------
# -----------------------Loction Sections start-------------------------
class LocationUserViews(APIView):
    def get(self,request):
        try:
            my_token = tokenauth(request.META['HTTP_AUTHORIZATION'][7:])
            if my_token:
                data=LocationModel.objects.filter(UserId=my_token['id']).order_by('-pk')
                serData=LocationModelSer(data, many=True)
                return Response({'status':True,'data':serData.data})
            else:
                  return Response({'status':False,'message':'token is expire'})

        except Exception as e:
         return Response({'status':False,'message':str(e)})
# -----------------------Loction Sections end-------------------------
# ------------------Agencys location Data end-------------