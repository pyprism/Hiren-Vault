from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hiren.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'password.views.index'),
    url(r'^login$', 'password.views.login'),
    url(r'^logout$', 'password.views.logout'),
    url(r'^add$', 'password.views.add'),
    url(r'^browse$', 'password.views.browse'),
)
