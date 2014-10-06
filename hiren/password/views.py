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
        return HttpResponse(result[1])
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
            encrypt = Secret()
            encrypted = encrypt.encrypt(password, 'hello')
            print(encrypted)
            x = Password(username=username, password=encrypted,
                         email=email, site_url=url, tags=tag, note=note, added_at=timezone.now())
            x.save()
            #print(encrypt.encrypt("hello", "@##4edff"))
            return HttpResponse("X")
        else:
            return render(request, 'add.html')
    else:
        return redirect('/')