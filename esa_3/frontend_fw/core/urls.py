# import os
# from frontend_fw import settings
from django.conf.urls import patterns, url, include
from django.views.generic.base import TemplateView

urlpatterns = patterns('core',
    # static views for framework lists
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^index.html$', TemplateView.as_view(template_name='index.html')),
    url(r'^index_help.html$', TemplateView.as_view(template_name='index_help.html')),

    url(r'^page/type_(?P<number>\d+[a-z]*).html', 'views.page'),
    url(r'^responsive/type_(?P<number>\d+[a-z]*).html', 'views.detail_responsive'),

    url(r'^index_page.html$', 'views.list_pages'),

    url(r'^responsive/index.html$', 'views.detail_responsive'),
    url(r'^page/index.html$', 'views.build_markup_bundle'),
    url(r'^page/$', 'views.page_index'),
)


