# Create your views here.
from xml.dom import minidom

# from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.template.loader import render_to_string
from core.helpers import get_page_list, get_work_list, fetch_pages, fetch_page, get_message, get_iframe_list


def page(request, number):

    make = request.GET.get('make','')
    dir_name = request.GET.get('dir','')
    if make != '':
        template = ''.join(["type_",number,".html",])
        fetch_page(template, dir_name)
    return render_to_response('page/type_%s.html' % number, {
    }, RequestContext(request))


def build_markup_bundle(request):

    make = request.GET.get('make','')
    dir = request.GET.get('dir','')
    status = None
    has_back_button = "yes"
    if make != '':
        content = render_to_string('page/index.html', {
            'page_list': get_page_list(),
            'work_list': get_work_list()
        }, RequestContext(request))

        has_back_button = None
        fetch_pages(content, dir)
        status = get_message('bundle_export')

    return render_to_response('page/index.html', {
        'page_list': get_page_list(),
        'work_list': get_work_list(),
        'status_build': status,
        'has_back_button': has_back_button
    }, RequestContext(request))


def page_index(request):
    page_list = get_page_list()
    work_list = get_work_list()
    has_btn = "YES"
    return render_to_response('page/index.html', {
        'page_list': page_list,
        'work_list': work_list,
        'has_back_button': has_btn
    }, RequestContext(request))


def list_pages(request):
    return render_to_response('index_page.html', {
        'page_list': get_page_list(),
        'work_list': get_work_list()
    }, RequestContext(request))


def detail_responsive(request):
    tpl = request.GET.get('template','')
    return render_to_response('responsive/index.html', {
        'i_frame_list': get_iframe_list(),
        'tpl': tpl
    }, RequestContext(request))
