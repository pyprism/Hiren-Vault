# from django.shortcuts import render
# from django.views.generic import View
# from django.views.generic import TemplateView
# from django.http import HttpResponse
#
# '''
# Date : 12 May, 2015
# '''
# # Create your views here.
#
#
# #class Authentication(TemplateView):
#
# #    template_name = 'index.html'
#     #def get(self, request, *args, **kwargs):

from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import FormView, View

class Login(FormView):
    form_class = AuthenticationForm
    template_name = 'index.html'

    def form_valid(self, form):
        redirect_to = settings.LOGIN_REDIRECT_URL
        print('before :D ')
        login(self.request, form.get_user())
        print('after :/ ')
        #if self.request.session.test_cookie_worked():
        #    self.request.session.delete_test_cookie()
        return HttpResponseRedirect(redirect_to)

    def form_invalid(self, form):
        print('invalid')
        return self.render_to_response(self.get_context_data(form=form))

    #@method_decorator(sensitive_post_parameters('password'))
    #def dispatch(self, request, *args, **kwargs):
    #    #request.session.set_test_cookie()
    #    return super(Login, self).dispatch(request, *args, **kwargs)

class Logout(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)