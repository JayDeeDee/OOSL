import errno
import glob
import os
import re
import string
import subprocess
import platform
from django.conf import settings
from core.templatesettings import PAGE_LIST, PAGE_WORK_LIST


def is_win():
    if platform.system() in 'Windows':
        return 1
    return 0


def get_page_list():
    return PAGE_LIST


def get_work_list():
    return PAGE_WORK_LIST