# Date : 12 May, 2015

from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import FormView, View
from .models import Password, Tag
from django.views.generic.edit import CreateView
from django.utils import timezone
from .crypto import Secret
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages, auth
from django.http import HttpResponse
from django.shortcuts import render, redirect


# class Login(FormView):
#     form_class = AuthenticationForm
#     template_name = 'index.html'
#     success_url = '/dashboard'
#
#     def form_valid(self, form):
#         login(self.request, form.get_user())
#         return super(Login, self).form_valid(form)
#
#     def form_invalid(self, form):
#         print('invalid')
#         return self.render_to_response(self.get_context_data(form=form))
#
#
# class Logout(View):
#     def get(self, request, *args, **kwargs):
#         logout(request)
#         return HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)

# class LoggedInMixin(object):
#
#     @method_decorator(login_required)
#     def dispatch(self, *args, **kwargs):
#         return super(LoggedInMixin, self).dispatch(*args, **kwargs)
#
# class AddData(LoggedInMixin, CreateView):
#     """
#       Add new data
#     """
#     model = Password
#     success_url = '/dashboard'
#     template_name = 'forms/add.html'
#     fields = ['site_url', 'username', 'email', 'password', 'note']
#
#     def form_valid(self, form):
#         Hiren = Secret(self.request.POST.get('key'))
#         form.instance.password = Hiren.encrypt(self.request.POST.get('password'))
#         form.instance.note = Hiren.encrypt(self.request.POST.get('note'))
#         form.instance.added_at = timezone.now()
#         return super(AddData, self).form_valid(form)
#
#     def form_invalid(self, form):
#         return self.render_to_response(self.get_context_data(form=form))


def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user)
            return redirect('/dashboard')
        else:
            messages.error(request, 'Username/Password is not valid!')
            return redirect("/")
    else:
        return render(request, 'index.html')


def logout(request):
    auth.logout(request)
    return redirect("/")

def browse(request):
    if request.user.is_authenticated():
        result = Password.objects.all().order_by('site_url')
        paginator = Paginator(result, 20)
        page = request.GET.get('page')
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            data = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            data = paginator.page(paginator.num_pages)
        return render(request, 'browse.html', {'data': data, 'title': 'Hiren->Browse'})
    else:
        return HttpResponse("U r not logged in")


def add(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            raw_url = request.POST.get('url')
            word = ("http://", "https://", "ftp://")
            for i in word:
                if i in raw_url:
                    url = raw_url.strip(i)
                    break
                else:
                    url = raw_url
            if url.startswith("www"):
                url = url.strip("www.")
            tag = request.POST.get('tag')
            note = request.POST.get('note')
            key = request.POST.get('key')
            encrypt = Secret(key)
            encrypted_pass = encrypt.encrypt(password)
            encrypted_note = encrypt.encrypt(note)
            data_mama = Password(username=username, password=encrypted_pass,
                                 email=email, site_url=url, note=encrypted_note, added_at=timezone.now())
            data_mama.save()
            tag = Tag(password=data_mama, tags=tag)
            tag.save()
            tag.pk = None
            tag.save(using='backup')
            data_mama.pk = None
            data_mama.save(using='backup')
            messages.info(request, 'Credential saved successfully')
            return render(request, 'forms/add.html', {'title': 'Hiren->Add'})
        else:
            return render(request, 'forms/add.html', {'title': 'Hiren->Add'})
    else:
        return redirect('/')


def show(request, ids):
    if request.user.is_authenticated():
        return render(request, 'show.html', {'id': ids, 'title': 'Hiren->Show'})


def update(request, ids):
    if request.user.is_authenticated():
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            raw_url = request.POST.get('url')
            word = ("http://", "https://", "ftp://")
            for i in word:
                if i in raw_url:
                    url = raw_url.strip(i)
                    break
                else:
                    url = raw_url
            if url.startswith("www"):
                url = url.strip("www.")
            tag = request.POST.get('tag')
            note = request.POST.get('note')
            key = request.POST.get('key')
            print(password)
            if password is None:   # wtf duplicate code !!
                obj = Password.objects.get(id=ids)
                obj.username = username
                obj.email = email
                obj.site_url = url
                obj.tags = tag
                obj.updated_at = timezone.now()
                obj.save()
                obj.pk = None
                obj.save(using='backup')
                messages.info(request, 'Entry updated')
                return redirect('/dashboard')
            else:
                encrypt = Secret(key)
                encrypted_pass = encrypt.encrypt(password)
                encrypted_note = encrypt.encrypt(note)
                obj = Password.objects.get(id=ids)
                obj.username = username
                obj.email = email
                obj.site_url = url
                obj.tags = tag
                obj.note = encrypted_note
                obj.password = encrypted_pass
                obj.updated_at = timezone.now()
                obj.save()
                obj.pk = None
                obj.save(using='backup')
                messages.info(request, 'Entry updated')
                return redirect("/dashboard")


def edit(request, ids):
    if request.user.is_authenticated():
        if request.method == "POST":
            key = request.POST.get('key')
            data = Password.objects.get(id=ids)
            decrypt = Secret(key)
            if decrypt.decrypt(data.password):
                password = decrypt.decrypt(data.password)
                note = decrypt.decrypt(data.note)
                return render(request, 'edit.html', {'data': data, 'password': password, 'note': note})
            else:
                messages.error(request, 'Your key is not correct')
                return render(request, 'edit.html', {'data': data, 'title': 'Hiren->Edit'})
        else:
            data = Password.objects.get(id=ids)
            return render(request, 'edit.html', {'data': data, 'title': 'Hiren->Edit'})


def delete(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            ids = request.POST.get('id')
            obj = Password.objects.get(id=ids)
            obj.delete()
            backup = Password.objects.using('backup').get(id=ids)
            backup.delete()
            messages.info(request, 'Entry deleted')
            return redirect('/browse')


def reveal(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            ids = request.POST.get('id')
            key = request.POST.get('key')
            data = Password.objects.get(id=ids)
            decrypt = Secret(key)
            if decrypt.decrypt(data.password):
                password = decrypt.decrypt(data.password)
                note = decrypt.decrypt(data.note)
                tag = Tag.objects.get(password=data.id)
                print(tag)
                print(tag.tags)
                return render(request, 'result.html', {'data': data, 'password': password,
                                                       'note': note, 'tag': tag.tags})
            else:
                messages.error(request, 'Your key is not correct')
                return redirect('/id/show/' + ids)

def search(request):
    pass