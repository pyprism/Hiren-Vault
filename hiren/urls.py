"""hiren URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.urls import re_path, path, include
from django.conf import settings
from rest_framework import routers
from password import views
from base import urls as base
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register('vault', views.VaultViewSet)
router.register('recent', views.RecentViewSet)

urlpatterns = [
    path('api/base/', include(base)),
    path(r'^api/', include(router.urls)),
]

if not settings.DEBUG:
    urlpatterns += [
        re_path('.*', TemplateView.as_view(template_name='index.html')),
    ]

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^silk/', include('silk.urls', namespace='silk')),
        re_path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
