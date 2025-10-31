from commons.file.models import File
from django.shortcuts import render, get_object_or_404
from django.http import FileResponse, HttpResponseForbidden
import os
from django.contrib.auth.decorators import login_required
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from django.views.generic import View
from medias.models import MediaSetting



class ProtectedFileHandlerView(View):    
    def get(self, request, *args, **kwargs):
        try:
            file_name = force_str(urlsafe_base64_decode(self.kwargs.get('file')))
            document = File.objects.get(url="media/"+file_name)
            response = FileResponse(document.url)
            return response
        except File.DoesNotExist:
            document = get_object_or_404(MediaSetting, created_file="media/"+file_name)
            response = FileResponse(document.created_file)
            return response
    

def securePdf(request, file):
    file_name = force_str(urlsafe_base64_decode(file))
    document = get_object_or_404(File, url="media/"+file_name)
    response = FileResponse(document.url)
    return response
    
    if request.META.get('HTTP_AUTHORIZATION'):
        access_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        try:
            token = AccessToken(access_token)
            user_id = token.payload['user_id']
            response = FileResponse(document.url)
            return response
        except:
            print("Error occured")
    else:
        return HttpResponseForbidden("You don't have permission to access this file.")
