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


def decrypt(request, ids):
    if request.user.is_authenticated():
        pass


def edit(request, ids):
    if request.user.is_authenticated():
        data = Password.objects.filter(id=ids)
        return render(request, 'edit.html', {'data': data[0]})


def reveal(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            ids = request.POST.get('id')
            key = request.POST.get('key')
            data = Password.objects.filter(id=ids)
            decrypt = Secret()
            if decrypt.decrypt(data[0].password, key):
                password = decrypt.decrypt(data[0].password, key)
                return render(request, 'result.html', {'data': data[0], 'password': password})
            else:
                messages.error(request, 'Your key is not correct')
                return redirect('/id/show' + ids)