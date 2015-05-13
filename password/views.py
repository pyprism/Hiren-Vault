from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse

'''
Date : 12 May, 2015
'''
# Create your views here.


class Authentication(View):

    def get(self, request, *args, **kwargs):
        return HttpResponse("sas")