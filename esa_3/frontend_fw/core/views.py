# Create your views here.
from xml.dom import minidom
import time

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.template.loader import  render_to_string
