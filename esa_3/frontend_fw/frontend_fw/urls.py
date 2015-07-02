import os
from django.conf.urls import patterns, include, url
from frontend_fw import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'frontend_fw.views.home', name='home'),
    # url(r'^frontend_fw/', include('frontend_fw.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'', include('core.urls', namespace='frontend_fw', app_name='core')),

)
