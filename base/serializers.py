from rest_framework.serializers import ModelSerializer
from .models import Setting


class SettingsSerializer(ModelSerializer):

    class Meta:
        model = Setting
        fields = ('active',)
