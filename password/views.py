# Date : 12 May, 2015

from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import FormView, View
from .models import Password
from django.views.generic.edit import CreateView
from django.utils import timezone
from .crypto import Secret


class Login(FormView):
    form_class = AuthenticationForm
    template_name = 'index.html'
    success_url = '/dashboard'

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(Login, self).form_valid(form)

    def form_invalid(self, form):
        print('invalid')
        return self.render_to_response(self.get_context_data(form=form))


class Logout(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)

class LoggedInMixin(object):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LoggedInMixin, self).dispatch(*args, **kwargs)

class AddData(LoggedInMixin, CreateView):
    """
      Add new data
    """
    model = Password
    success_url = '/dashboard'
    template_name = 'forms/add.html'
    fields = ['site_url', 'username', 'email', 'password', 'note']

    def form_valid(self, form):
        Hiren = Secret(self.request.POST.get('key'))
        form.instance.password = Hiren.encrypt(self.request.POST.get('password'))
        form.instance.note = Hiren.encrypt(self.request.POST.get('note'))
        form.instance.added_at = timezone.now()
        return super(AddData, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))