# Create your views here.
from xml.dom import minidom
import time

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.template.loader import render_to_string
# from core.helpers import render_page_content
from core.helpers import get_page_list, get_work_list


def page(request, number):
    # content = render_page_content()
    return render_to_response('page/type_%s.html' % number, {
        # 'page_content': content
    }, RequestContext(request))


def progress_page(request, number):
    # content = render_page_content()
    return render_to_response('page/_type_%s.html' % number, {
        # 'page_content': content
    }, RequestContext(request))


def build_markup_bundle(request):
    page_list = get_page_list()
    return render_to_response('page/index.html', {
        'page_content': get_page_list()
    }, RequestContext(request))


def list_pages(request):
    return render_to_response('index_page.html', {
        'page_list': get_page_list(),
        'work_list': get_work_list()
    }, RequestContext(request))
