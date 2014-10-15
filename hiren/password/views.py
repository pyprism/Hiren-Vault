from django.shortcuts import render, redirect
from django.contrib import auth, messages
from django.http import HttpResponse
from .models import Password
from django.utils import timezone
from .secret import Secret
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


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
        return render(request, 'browse.html', {'data': data})
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
            encrypt = Secret()
            encrypted_pass = encrypt.encrypt(password, key)
            encrypted_note = encrypt.encrypt(note, key)
            data_mama = Password(username=username, password=encrypted_pass,
                                 email=email, site_url=url, tags=tag, note=encrypted_note, added_at=timezone.now())
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
                messages.info(request, 'Entry updated')
                return redirect('/browse')
            else:
                encrypt = Secret()
                encrypted_pass = encrypt.encrypt(password, key)
                encrypted_note = encrypt.encrypt(note, key)
                obj = Password.objects.get(id=ids)
                obj.username = username
                obj.email = email
                obj.site_url = url
                obj.tags = tag
                obj.note = encrypted_note
                obj.password = encrypted_pass
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
                note = decrypt.decrypt(data.note, key)
                return render(request, 'edit.html', {'data': data, 'password': password, 'note': note})
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
            if Recent.objects.count() <= 4:
                Recent(used=data).save()
            else:
                Recent.objects.all()[2:3].delete()
                Recent(used=data).save()
            decrypt = Secret()
            if decrypt.decrypt(data.password, key):
                password = decrypt.decrypt(data.password, key)
                return render(request, 'result.html', {'data': data, 'password': password})
            else:
                messages.error(request, 'Your key is not correct')
                return redirect('/id/show' + ids)


def search(request):
    if request.user.is_authenticated():
        if request.method == "POST":
            search = request.POST.get('search')
            options = request.POST.get('option')
            if options == "url":
                result = Password.objects.filter(site_url=search)
            elif options == "tags":
                result = Password.objects.filter(tags=search)
            elif options == "username":
                result = Password.objects.filter(username=search)
            elif options == "email":
                result = Password.objects.filter(email=search)
            return render(request, "result.html", {'result': result})
        else:
            return redirect("/browse")