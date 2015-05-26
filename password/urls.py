__author__ = 'prism'
'''
Date : 12 May, 2015
'''
from django.conf.urls import include, url
#from .views import Authentication
from .views import Login, Logout, AddData

urlpatterns = [
    url(r'^$', Login.as_view(), name='auth'),
    url(r'^logout/$', Logout.as_view()),
    url(r'^add/$', AddData.as_view())
]