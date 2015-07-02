/**
 * Created by jdeu on 02.07.15.
 */

// + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// wording translations
// + + + + + + + + + + + + + + + + + + + + + + + + + + + +
var wording = {
    'general':{
        'titleAExt': {
            'de': 'externer Link - öffnet in neuem Fenster',
            'en': 'external link opens new window'
        },
        'titleANewW': {
            'de': 'öffnet in neuem Fenster',
            'en': 'opens new window'
        },
        'titleALoad': {
            'de': 'Download - öffnet in neuem Fenster',
            'en': 'download opens new window'
        },
        'rew': {
            'de': 'zur&uuml;ck',
            'en': 'back'
        },
        'ff': {
            'de': 'weiter',
            'en': 'forward'
        },
        'hscroll': {
            'de': 'Blätterfunktion',
            'en': 'Scrolling function'
        },
        'close': {
            'de': 'schließen',
            'en': 'close'
        },
        'open': {
            'de': 'öffnen',
            'en': 'open'
        },
        'news': {
            'de': 'Nachricht',
            'en': 'News'
        },
        'rewNews': {
            'de': 'vorherige Nachricht anzeigen',
            'en': 'show previous news'
        },
        'ffNews': {
            'de': 'nächste Nachricht anzeigen',
            'en': 'show next news'
        },
        'curr': {
            'de': 'angezeigt',
            'en': 'actual position'
        },
        'act': {
            'de': 'ausgewählt',
            'en': 'selected'
        },
        'pause': {
            'de': 'Anhalten',
            'en': 'pause'
        },
        'play': {
            'de': 'Abspielen',
            'en': 'play'
        },
        'search': {
            'de': 'Suchbegriff',
            'en': 'Search word'
        },
        'closeLb': {
            'de': 'Lightbox schließen',
            'en': 'Close lightbox'
        },
        'showMore': {
            'de': 'Zusatzinformationen einblenden',
            'en': 'Show additional information'
        },
        'hideMore': {
            'de': 'Zusatzinformationen ausblenden',
            'en': 'Hide additional information'
        },
        'change': {
            'en': 'Wechseln zu',
            'de': 'Switch to'

        },
        'currLang': {
            'de': 'aktuelle Sprache deutsch',
            'en': 'current language Englisch'
        }

    }
};


var fnoptions = {
    'general':{
        'idlbw': 'lightboxWrapper',
        'clbinner': 'vis',
        'idlbo': 'lightboxOverlay',
        'domclb': '#ajaxContent'
    },
    'dombrowse': function(lang, cid, pos){ return '<h3 class="out">'+wording.general.hscroll[lang]+'</h3><p><span class="prev noprint"><a class="prev" href="'+page_url+'#'+cid+'"><span class="noborder"><img src="'+path_img+'browse_rew.png" alt="'+wording.general.rew[lang]+'" height="50" width="51"></span></a><span class="out">/</span></span><strong>'+pos+'</strong><span class="next noprint"><a class="next" href="'+page_url+'#'+cid+'"><span class="noborder"><img src="'+path_img+'browse_ff.png" alt="'+wording.general.ff[lang]+'" height="50" width="51"></span></a></span></p><span class="off none"></span><div class="clearer"><hr class="structure"></div>';
    }
};
