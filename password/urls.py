__author__ = 'prism'
'''
Date : 12 May, 2015
'''
from django.conf.urls import include, url
from .views import Authentication

urlpatterns = [
    url(r'^$', Authentication.as_view(), name='auth'),
]