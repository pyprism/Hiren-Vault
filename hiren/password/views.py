from django.shortcuts import render, redirect
from django.contrib import auth, messages
from django.http import HttpResponse
from .models import Password
# Create your views here.


def index(request):
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
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        url = request.POST.get('url')
    else:
        return HttpResponse("U r not logged in")


def add(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            pass
        else:
            return render(request, 'add.html')
    else:
        return redirect('/')