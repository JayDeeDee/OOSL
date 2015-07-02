import os
from frontend_fw import settings
from django.conf.urls import patterns, url, include
from django.views.generic.base import TemplateView

urlpatterns = patterns('core',
    # static views for framework lists
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^index.html$', TemplateView.as_view(template_name='index.html')),
    url(r'^index_page.html$', TemplateView.as_view(template_name='index_page.html')),
    url(r'^index_screens.html$', TemplateView.as_view(template_name='index_screens.html')),
)


