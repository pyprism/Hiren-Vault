__author__ = 'prism'
# date : 26 May , 2015

from django.forms import ModelForm
from .models import Password

class PasswordForm(ModelForm):
    class Meta:
        model = Password
        fields = ['site_url', 'username', 'email', 'password', 'note', ]



