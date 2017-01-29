from rest_framework import serializers
from .models import Vault, Recent
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class VaultSerializer(TaggitSerializer, serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    tag = TagListSerializerField()

    class Meta:
        model = Vault
        fields = '__all__'


class RecentSerializer(serializers.ModelSerializer):
    accessed_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Recent
        fields = '__all__'


class TagsListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
