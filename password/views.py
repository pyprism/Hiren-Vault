from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Vault, Recent
from .serializers import VaultSerializer, RecentSerializer, TagsListSerializer
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from django.utils import timezone
from taggit.models import Tag
from rest_framework.generics import ListAPIView
from django.core import serializers
from rest_framework import status
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
import os
import logging


@csrf_exempt
def login(request):
    """
    token authentication for desktop apps
    :param request:
    :return:
    """
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': str(token[0])})
        else:
            return HttpResponse(
                """
                Username or password is not valid!
                """,
                status=403,
            )


class BunnyAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `npm
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `npm run build` to test the production version.
                """,
                status=501,
            )


class VaultViewSet(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer

    def retrieve(self, request, pk=None, *args, **kwargs):
        """
        Save recently accessed item to recent table
        """
        instance = self.get_object()
        if instance:
            obj, created = Recent.objects.get_or_create(vault=instance)
            if not created:
                count = Recent.objects.count()
                if count == 20:  # table can contain 20 max items, otherwise delete the 1st item brutally :D
                    obj_del = Recent.objects.first()
                    obj_del.delete()
                obj.accessed_at = timezone.now()
                obj.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # def get_serializer(self, *args, **kwargs):
    #     """
    #     enable bulk creation
    #     """
    #     if "data" in kwargs:
    #         data = kwargs["data"]
    #
    #         if isinstance(data, list):
    #             kwargs["many"] = True
    #     return super(VaultViewSet, self).get_serializer(*args, **kwargs)


# class TagViewSet(viewsets.ModelViewSet):
#     authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
#     permission_classes = (IsAuthenticated,)
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer

#     @detail_route(methods=['get'])
#     def tagged(self, request, *args, **kwargs):
#         """
#         Get all Vault item with specific tag
#         """
#         instance = self.get_object()
#         if instance:
#             hiren = Vault.objects.filter(tag=instance.id)
#             data = serializers.serialize("json", hiren)
#             return Response(data)


class RecentViewSet(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Recent.objects.order_by('-accessed_at')
    serializer_class = RecentSerializer


class TagsListView(ListAPIView):
    """
    API endpoint that return list of tags
    """
    queryset = Tag.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
    serializer_class = TagsListSerializer


# class SecretViewset(viewsets.ModelViewSet):
#     """
#         API endpoint that allows secret key  to be created, viewed ,edited.
#     """
#     authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
#     permission_classes = (IsAuthenticated,)
#     queryset = Secret.objects.all()
#     serializer_class = SecretSerializer

#     def create(self, request, *args, **kwargs):
#         """
#         Check if secret key already exists
#         """
#         count = Secret.objects.all().count()
#         if count == 1:
#             content = {'error': 'key already exits'}
#             return Response(content, status.HTTP_403_FORBIDDEN)
#         else:
#             instance = self.request.data['key']
#             Secret.objects.create(key=instance)
#             response = {"done": "key created"}
#             return Response(response, status.HTTP_201_CREATED)

#     def destroy(self, request, pk=None, *args, **kwargs):
#         bunny = {'error': 'method not supported :/'}
#         return Response(bunny, status.HTTP_403_FORBIDDEN)

#     def list(self, request, *args, **kwargs):
#         query = Secret.objects.all()
#         if query.count() == 0:
#             return Response(" :P ", status.HTTP_404_NOT_FOUND)
#         else:
#             serializer = self.get_serializer(query, many=True)
#             return Response(serializer.data)
