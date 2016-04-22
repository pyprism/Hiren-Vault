from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Vault, Recent, Tag
from .serializers import VaultSerializer, TagSerializer, RecentSerializer
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from django.utils import timezone
from django.core import serializers


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


class TagViewSet(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    @detail_route(methods=['get'])
    def tagged(self, request, *args, **kwargs):
        """
        Get all Vault item with specific tag
        """
        instance = self.get_object()
        if instance:
            hiren = Vault.objects.filter(tag=instance.id)
            data = serializers.serialize("json", hiren)
            return Response(data)


class RecentViewSet(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Recent.objects.order_by('-id')
    serializer_class = RecentSerializer
