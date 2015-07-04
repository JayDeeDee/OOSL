from HTMLParser import HTMLParser
import codecs
import errno
import glob
import os
import re
import string
import subprocess
import datetime
import shutil
import time
import platform
from django.template.loader import  render_to_string
from django.conf import settings
from core.templatesettings import EXP, PAGE_LIST, PAGE_WORK_LIST, BUILD_PAGE_DIRS, BUILD_PAGE_EXCLUDED, STAT_DIRS, STATUS_MESSAGES


def is_win():
    if platform.system() in 'Windows':
        return 1
    return 0


def get_page_list():
    return PAGE_LIST


def get_work_list():
    return PAGE_WORK_LIST


def get_timestamp():
    return datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d_%H-%M-%S')


def check_path_exist(p):
    if not os.path.exists(p):
        os.makedirs(p)


def delete_path_exist(p):
    if os.path.exists(p):
        shutil.rmtree(p)


# def bash_command(cmd):
    # subprocess.Popen(cmd, shell=True, executable='/bin/sh')
    # my_path = os.path.dirname(os.path.realpath(__file__))
    # print(my_path)
    # subprocess.Popen('echo ', shell=True)


def test_shell():
    print 'shell'
    # bash_command('a="Apples and oranges" && echo "${a/oranges/grapes}"')

def get_message(msg):
    print STATUS_MESSAGES[msg]
    return STATUS_MESSAGES[msg]


def fetch_page(template,content='',export_dir=''):

    if len(export_dir) <= 1:
        out = ''.join(["templates",get_timestamp(),])
    else:
        out = export_dir

    file_basename = os.path.basename(template)
    target_out = os.path.join(EXP,out)

    check_path_exist(os.path.join(target_out,"page"))

    # render file
    file_name = os.path.join(target_out,"page", file_basename)
    write_markup(content, file_name)
    fetch_static(target_out)


def fetch_pages(index='',export_dir=''):
    templates = gather_templates(BUILD_PAGE_DIRS)
    if len(export_dir) <= 1:
        out = ''.join(["templates",get_timestamp(),])
    else:
        out = export_dir

    target_out = os.path.join(EXP,out)

    for f in templates:
        if f in BUILD_PAGE_EXCLUDED:
            continue

        file_basename = os.path.basename(f)
        check_path_exist(os.path.join(target_out,"page"))

        # render files
        # index file
        if file_basename == "index.html":
            if len(index) > 1:
                file_name = os.path.join(target_out,"page", file_basename)
                content = index
                write_markup(content, file_name)
        else:
            file_name = os.path.join(target_out,"page", file_basename)
            content = render_to_string(f)
            write_markup(content, file_name)
    fetch_static(target_out)


def fetch_static(target_out, exclude_static="", project_static="static", framework_static="framework"):
    print "get static"

    target_static = os.path.join(target_out,project_static)
    framework_static = os.path.join(target_out,framework_static)
    delete_path_exist(target_static)
    check_path_exist(target_static)
    delete_path_exist(framework_static)
    check_path_exist(framework_static)

    for (i, dir) in enumerate(STAT_DIRS):
        if i == 0:
            temp_static = target_static
        else:
            temp_static = framework_static
        shutil.copytree(os.path.join(STAT_DIRS[i], 'js'), os.path.join(temp_static, 'js'))
        shutil.copytree(os.path.join(STAT_DIRS[i], 'css'), os.path.join(temp_static, 'css'))
        shutil.copytree(os.path.join(STAT_DIRS[i], 'fonts'), os.path.join(temp_static, 'fonts'))
        shutil.copytree(os.path.join(STAT_DIRS[i], 'img'), os.path.join(temp_static, 'img'))
        shutil.copy2(os.path.join(STAT_DIRS[i], 'favicon.ico'), os.path.join(temp_static, 'favicon.ico'))

    if len(exclude_static) > 1:
        remove_static = os.path.join(target_out, exclude_static)
        delete_path_exist(remove_static)


def gather_templates(directories):
    templates = list()

    for directory in directories:
        for filename in os.listdir(directory):
            if filename[-5:] == '.html':
                templates.append(os.path.join(directory, filename))
    return templates


def write_markup(content, filename):
    print filename
    if filename[-10:] == 'index.html':
        content = string.replace(content, '/static/', '/framework/')
    with codecs.open(filename, mode='w+', encoding='utf-8') as f:
        f.write(content)


