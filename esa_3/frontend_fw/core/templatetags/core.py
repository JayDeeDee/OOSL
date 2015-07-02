import os
from django import template
from django.conf import settings

register = template.Library()

CURRENT_VERSION = None

