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
    url(r'^id/(?P<ids>\d+)/show$', 'password.views.show'),
    url(r'^id/(?P<ids>\d+)/update$', 'password.views.update'),
    url(r'^id/(?P<ids>\d+)/edit$', 'password.views.edit'),
    url(r'^id/(?P<ids>\d+)/edit$', 'password.views.edit'),
    url(r'^delete$', 'password.views.delete'),
    url(r'^reveal$', 'password.views.reveal'),
)
