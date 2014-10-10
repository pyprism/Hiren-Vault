from __future__ import unicode_literals
from django.shortcuts import render, redirect
from django.contrib import auth, messages
from django.http import HttpResponse
from .models import Password
from django.utils import timezone
from .secret import Secret


def index(request):
    if request.user.is_authenticated():
        return redirect('/browse')
    else:
        return render(request, "index.html")


def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user)
            return redirect('/add')
        else:
            messages.error(request, 'Username/Password is not valid!')
            return redirect("/")
    else:
        return redirect('/')


def logout(request):
    auth.logout(request)
    return redirect("/")


def browse(request):
    if request.user.is_authenticated():
        result = Password.objects.all()
        return render(request, 'browse.html', {'data': result})
    else:
        return HttpResponse("U r not logged in")


def add(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            url = request.POST.get('url')
            tag = request.POST.get('tag')
            note = request.POST.get('note')
            key = request.POST.get('key')
            encrypt = Secret()
            encrypted = encrypt.encrypt(password, key)
            data_mama = Password(username=username, password=encrypted,
                                 email=email, site_url=url, tags=tag, note=note, added_at=timezone.now())
            data_mama.save()
            messages.info(request, 'Credential saved successfully')
            return render(request, 'add.html')
        else:
            return render(request, 'add.html')
    else:
        return redirect('/')


def show(request, ids):
    if request.user.is_authenticated():
        return render(request, 'show.html', {'id': ids})


def update(request, ids):
    if request.user.is_authenticated():
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            url = request.POST.get('url')
            tag = request.POST.get('tag')
            note = request.POST.get('note')
            key = request.POST.get('key')
            data = Password.objects.get(id=ids)
            if password == data.password:   # wtf duplicate code !!
                obj = Password.objects.get(id=ids)
                obj.username = username
                obj.email = email
                obj.site_url = url
                obj.tags = tag
                obj.note = note
                obj.updated_at = timezone.now()
                obj.save()
                messages.info(request, 'Entry updated')
                return request('/browse')
            else:
                encrypt = Secret()
                encrypted = encrypt.encrypt(password, key)
                obj = Password.objects.get(id=ids)
                obj.username = username
                obj.email = email
                obj.site_url = url
                obj.tags = tag
                obj.note = note
                obj.password = encrypted
                obj.updated_at = timezone.now()
                obj.save()
                messages.info(request, 'Entry updated')
                return redirect("/browse")


def edit(request, ids):
    if request.user.is_authenticated():
        if request.method == "POST":
            key = request.POST.get('key')
            data = Password.objects.get(id=ids)
            decrypt = Secret()
            if decrypt.decrypt(data.password, key):
                password = decrypt.decrypt(data.password, key)
                return render(request, 'edit.html', {'data': data, 'password': password})
            else:
                messages.error(request, 'Your key is not correct')
                return render(request, 'edit.html', {'data': data})
        else:
            data = Password.objects.get(id=ids)
            return render(request, 'edit.html', {'data': data})


def delete(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            ids = request.POST.get('id')
            obj = Password.objects.get(id=ids)
            obj.delete()
            messages.info(request, 'Entry deleted')
            return redirect('/browse')


def reveal(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            ids = request.POST.get('id')
            key = request.POST.get('key')
            data = Password.objects.get(id=ids)
            decrypt = Secret()
            if decrypt.decrypt(data.password, key):
                password = decrypt.decrypt(data.password, key)
                return render(request, 'result.html', {'data': data, 'password': password})
            else:
                messages.error(request, 'Your key is not correct')
                return redirect('/id/show' + ids)