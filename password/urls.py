__author__ = 'prism'
'''
Date : 12 May, 2015
'''
from django.conf.urls import include, url
#from .views import Login, Logout

urlpatterns = [
    url(r'^$', 'password.views.login'),
    url(r'^logout/$', 'password.views.logout'),
    url(r'^add', 'password.views.add'),
    url(r'^dashboard$', 'password.views.browse'),
    url(r'^id/(?P<ids>\d+)/show$', 'password.views.show'),
    url(r'^id/(?P<ids>\d+)/update$', 'password.views.update'),
    url(r'^id/(?P<ids>\d+)/edit$', 'password.views.edit'),
    url(r'^id/(?P<ids>\d+)/edit$', 'password.views.edit'),
    url(r'^delete$', 'password.views.delete'),
    url(r'^reveal$', 'password.views.reveal'),
    url(r'^search$', 'password.views.search'),
]
