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
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from rest_framework import routers
from password import views

router = routers.DefaultRouter()
router.register('vault', views.VaultViewSet)
router.register('recent', views.RecentViewSet)

urlpatterns = [
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^login/', views.login),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/tags/', views.TagsListView.as_view()),
    url(r'^', views.BunnyAppView.as_view()),
]
