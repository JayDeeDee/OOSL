# coding=utf-8

import os
from frontend_fw import settings


STATUS_MESSAGES = {
    'bundle_export': 'Der Export wurde durchgeführt und enthält die unten angeführten Vorlagen',
    'page_export': 'Die Seite wurde exportiert'
}

IFRAME_LIST = {
    '0': {
        'id': 'mob1',
        'tab': 'Mobil hoch',
        'headline': 'Mobiles Hochformat',
        'width': '320',
        'height': '480'
    },
    '1': {
        'id': 'mob2',
        'tab': 'Mobil quer',
        'headline': 'Mobiles Querformat',
        'width': '480',
        'height': '320'
    },
    '2': {
        'id': 'tab1',
        'tab': 'Tablet klein hoch',
        'headline': 'Hochformat für kleine Tablets',
        'width': '600',
        'height': '800'
    },
    '3': {
        'id': 'tab2',
        'tab': 'Tablet klein quer',
        'headline': 'Querformat für kleine Tablets',
        'width': '800',
        'height': '600'
    },
    '4': {
        'id': 'tab3',
        'tab': 'Tablet groß hoch',
        'headline': 'Tablethochformat',
        'width': '768',
        'height': '1024'
    },
    '5': {
        'id': 'tab14',
        'tab': 'Tablet groß quer',
        'headline': 'Tabletquerformat',
        'width': '1024',
        'height': '768'
    }
}

# page index for templates that are ready
PAGE_LIST = {
    '0': {
        'headline': "Seitentypen",
        'intro': "Das ist ein kurzer erklärender Text zu den aufgeführten Vorlagen",
        'pages': {
            'type_0.html': 'Startseite mit Slider',
            'type_1.html': 'Standardseite mit Introtext '
        }
    },
    '1': {
        'headline': "Inhaltstypen",
        'intro': "Das ist ein kurzer erklärender Text zu den aufgeführten Vorlagen",
        'pages': {
            'type_1.html': 'Slider, Intro und Teaserblock',
            'type_2.html': 'Buttons und Links',
            'type_4.html': 'Panels'
        }
    }
}

# page index for templates that are in work
PAGE_WORK_LIST = {
    '0': {
        'headline': "Inhaltlicher Abschnitt 1",
        'intro': "Das ist ein kurzer erklärender Text zu den aufgeführten Vorlagen",
        'pages': {
            'type_3.html': 'Buttons und Links - Alternative Landing Page',
        }
    },
}

# add pages if you do not want them included in the export bundle
BUILD_PAGE_EXCLUDED = (
    os.path.join(settings.APP_DIR, 'templates', 'page', 'type_0.html'),
)

# directory in page markup is stored
BUILD_PAGE_DIRS = (
    os.path.join(settings.APP_DIR, 'templates', 'page'),
)

# static files are found here, already defined in settings, so we use that instead
STAT_DIRS = settings.STATICFILES_DIRS

#django project directory and export directory
PRO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))
TPL = os.path.join(settings.APP_DIR, 'templates')
PAG = os.path.join(TPL, 'page')
EXP = os.path.join(PRO, 'export')
