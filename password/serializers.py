from rest_framework import serializers
from .models import Vault, Tag, Recent


class VaultSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Vault


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag


class RecentSerializer(serializers.ModelSerializer):
    accessed_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Recent