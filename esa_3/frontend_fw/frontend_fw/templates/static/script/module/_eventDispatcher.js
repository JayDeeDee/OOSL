
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + +
 module : _jQueryPlugIns
 Authors: JDE; Copyright (c) CosmoCode GmbH
 + + + + + + + + + + + + + + + + + + + + + + + + + + + */



// + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// jQuery PlugIns
// + + + + + + + + + + + + + + + + + + + + + + + + + + + +



;(function($) {


    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
    /* global vars: view status, scroll position and window size */

    var _scrollview             = $(document),
        _window                 = $(window),
        _document               = $(document),
        _scrollDir              = '',                                   /* scroll direction */
        _scrolledTop            = false,                                /* scroll animation to top completed */
        _scrolledContent        = false,                                /* scroll animation to content completed */
        _lastScrollTop          = 0,                                    /* last scroll position from top */
        _windowHeight           = $(window).height(),                   /* height of window */
        _windowWidth            = $(window).width(),                    /* width of window */
        _view                   = $('#viewtype'),                       /* control div for CSS media query */
        _viewType               = 0,                                    /* 1= Mobile, 2 = Tablet, 3 = Desktop */
        _idContent              = 'content',
        _idFooter               = 'footer',
        _title                  = $(document).find("title").text() || "",
        _arrTitle               = _title.split(":",2);


    if(ua.is_ie && iev < 9){
        _scrollview = _window;
    }


    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
    /* global little helpers */

        /**
         * get the current window size and change global vars accordingly
         */
    var _getWindowSize = function(e){
            _windowHeight = _window.height();
            _windowWidth = _window.width();
            _hpHeight = _hp.height();

            if(_viewTypeChangeDetected){

                _viewType = _view.height();
                $(document).trigger('switch_pageview',{vt:_viewType, et: e.type });
            }
        },

        /**
         * initialize Mobile View
         */
        _initMobileView = function(e, data, isStart){
            var et = data.et;
            var speed = (_isReady(et) || _isResize(et)) ? 0 : 1000;
            _viewType = 1;
        },

        /**
         * initialize Tablet View
         */
        _initTabletView = function(event, data, isStart){
            var et = data.et;
            var speed = (_isReady(et) || _isResize(et)) ? 0 : 1000;
            _viewType = 2;
        },

        /**
         * initialize Desktop View
         */
        _initDesktopView = function(event, data, isStart){
            var et = data.et;
            var speed = (_isReady(et) || _isResize(et)) ? 0 : 1000;
            _viewType = 3;
        },


        /**
         * scroll to page elem with given id and speed
         * @param cscroll container that is scrolled to
         * @param speed speed for scroll animation
         * @private
         */
        _scrollPage = function(cscroll,speed){
            var myoffset = $("#"+cscroll).position().top;
            var topoffset = $("#top").position().top;

            if(!isNaN(topoffset) && !isNaN(myoffset) && topoffset < 0){
                myoffset = myoffset - topoffset;
            }
            _scrolledTop = false;
            $page = $('html,body');
            $page.stop(); /* still queue  */
            $page.animate({ scrollTop: (function(tmp){ return tmp; })(myoffset-navheight) }, speed, function(){
                _scrolledContent = true;
            });
        },

        /**
         * scroll to top of page afterwards hide jquery Obj $templ
         * @param speed speed for scroll animation
         * @param $templ jquery Obj is hidden after animation
         */
        _scrollTopPage = function($templ, speed){
            _scrolledContent = false;
            $page = $('html,body');
            $page.stop();
            $page.animate({ scrollTop: (function(tmp){ return tmp; })(0) }, speed, function() {
                _scrolledTop = true;
            });
        },

        /**
         * check if viewtype has changed
         * @returns {boolean}
         */
        _viewTypeChangeDetected = function(){
            return (_viewType !== _view.height());
        },

        /**
         * check if viewtype is desktop
         * @returns {boolean}
         */
        _isDesktop = function(){
            return (_viewType === 3);
        },

        /**
         * check if initiating event is onload
         * @param et String name of initiating event
         * @returns {boolean}
         */
        _isReady = function(et){
            return (et === 'ready');
        },

        /**
         * check if initiating event is resize
         * @param et String name of initiating event
         * @returns {boolean}
         */
        _isResize = function(et){
            return (et === 'resize');
        },

        /**
         * check if initiating event is click
         * @param et String name of initiating event
         * @returns {boolean}
         */
        _isClick = function(et){
            return (et === 'click');
        },

        /**
         * switch classes for body element
         * @param newClasses String classes to be added
         * @param delay int delay before the switch takes placs(in milliseconds)
         */
        _changeClasses = function(newClasses, delay){
            //jde._debug('_changeClasses');
            var change = setTimeout(function(){ $('body').removeAttr('class').addClass('docjs '+newClasses); /*jde._debug('_changeClasses: timeout');*/   }, delay);
        };

    /**
     * anonymous func: get page language
     */
    (function(l){ if(typeof(l)!= 'undefined' && l.length>=2) lang=l.substr(0,2).toLowerCase(); if(lang!='de'&&lang!='en') lang='de'; })($("html").attr("lang"));



    /**
     * anonymous func: set docjs class for JS specific styles
     */
    (function(w){ w.addClass('docjs');  })($('body'));

    /**
     * add_bwrapper
     * jquery helper plug-in: set browser specific class and add lightbox markup
     */
    $.fn.add_bwrapper = function(){
        var loptions = {
            config: {
                debug: false,
                bclass: 'browser',
                domlb: '<div id="'+fnoptions.general.idlbw+'" style="display: none;"></div><div class="'+fnoptions.general.idlbo+'" style="display: none;"></div>'
            }
        }, s = jde.merge(jde,loptions,{},{});
        /*s._debug(s._get_objVs(s));*/

        return this.each(function() {
            var $this = $(this);
            try{
                var bclass=s.config.bclass+" ";
                if(!uua && ua){ /* see behaviour.js */
                    for (var elem in ua){
                        if(ua[elem]) bclass += elem+' ';
                    }
                }
                s._debug(bclass);
                $('html').addClass(bclass);
                try{
                    if(! $('body').has("#"+fnoptions.general.idlbw).length > 0){
                        $this.find(fnoptions.general.domclb).before(s.config.domlb);
                    }

                }catch(err){
                    s._debug(err);
                }


            }catch(err){
                s._debug(err);
            }
        });
    };


    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
    /* global event bindings */

    /**
     * bind scroll event on _scrollview
     */
    _scrollview.on('scroll', function(e, data) {

        var st = $(this).scrollTop();
        if (st > _lastScrollTop){
            _scrollDir = 'down';
        } else {
            _scrollDir = 'up';
        }
        _lastScrollTop = st;
        /*var breakpoint = _windowHeight - 50 || 300;
        if(_lastScrollTop < breakpoint){
            $('html').removeClass('contentSection');
        }else{
            $('html').addClass('contentSection');
        }*/
        $('#navMain').getMethods('stickyElements');
    });

    /**
     * bind scroll event on _window
     */
    _window.on('resize', function(e, data) {
        _getWindowSize(e);
    });


    _document
        .one('ready', function(e, data) { /* document onload */
            _getWindowSize(e);
            $(document).getMethods("initAjaxNav");
            _checkHasSub();
        })
        .on('switch_pageview', function(e, data) {

            var isStart = (data.et == "ready") ? $('body').hasClass('start') : (_viewTypeSection == 1);
            _viewTypeSection = (isStart) ?  1 : 2;

            /* global methods to initialize view dependent page stati  */
            $('a.menuToggle').getMethods('navMobileSlide');
            if(data.et == 'ready') $('#navMain').getMethods('stickyElements',{'initial': true });
            else $('#navMain').getMethods('stickyElements');

            switch (data.vt) {
                case 1:
                    _initMobileView(e, data, isStart);
                    break;
                case 2:
                    _initTabletView(e, data, isStart);
                    break;
                case 3:
                    _initDesktopView(e, data, isStart);
                    break;
                default:
                    break;
            }
        })
        .on('pagetypesection-start', function(e, data) {
            var speed = data.speed || 0;
            /*console.log(speed);*/
            _viewTypeSection = 1;
            $('html').removeClass('contentSection');
            _initSection(true, speed);
            if(data.newClasses){
                _changeClasses(data.newClasses, speed);
            }

        })
        .on('pagetypesection-standard', function(e, data) {
            var speed = data.speed || 0;
            _viewTypeSection = 2;
            $('html').addClass('contentSection');
            _initSection(false,speed);
            if(data.newClasses){
                _changeClasses(data.newClasses, speed);
            }
        })
        .on('ajaxcontent-load', function(e, data) {
            /* exec content plugins  */
            _checkHasSub();
            $('#content div.spoiler').spoiler_toggle();
            $('#content .scrollbar li a').content_scrollbar();
            $('#content select.mobileScrollbar').content_scrollbar();
            $('#content form.event-menu').event_select();
            $('#content .imageBlock').content_info_imageblock();
        })
        .on('ajaxpage-load', function(e, data) {
            if((data.newClasses).toString().indexOf('start') >= 0){
                jde._debug('ajaxpage-load: start');

                _document.trigger('pagetypesection-start',{speed: 800, newClasses: data.newClasses });
                _document.trigger('ajaxcontent-load');
            }else{
                jde._debug('ajaxpage-load: standard');
                _document.trigger('pagetypesection-standard',{speed: 800, newClasses: data.newClasses });
                _document.trigger('ajaxcontent-load');
            }

        })
    ;



    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
    /* Sticky nav effects (navMain, navSocial) */

    var eak = {
        init: function(opts){

        },
        navMobileSlide: function(opts){
            var loptions = {
                config: {
                    'debug'     : false,
                    'idMenu'    : 'navMobile',
                    'canvasElems' : '.canvasElem, #homepage, .container.logo, #navMobileBoard, #content, #footer, #navMain',
                    'side'      : 'left',
                    'navWidth' : '18.625em',
                    'speed'     : '600'

                },
                'initial'      : false
            }, s = jde.merge(jde,loptions,opts,{});
            /*s._debug(s._get_objVs(s));*/


            var $this = this,
                $menu = $('#'+s.config.idMenu),
                $canvas = $(s.config.canvasElems),
                width = s.config.navWidth,

                positionOffScreen = {
                    'position': 'fixed',
                    'top': '0',
                    'bottom': '0',
                    'width': width,
                    'height': '100%'
                },

                side = s.config.side,
                speed = s.config.speed,
                animateSlide = {
                    '-webkit-transition': side + ' ' + speed + 'ms ease',
                    '-moz-transition': side + ' ' + speed + 'ms ease',
                    '-ms-transition': side + ' ' + speed + 'ms ease',
                    '-o-transition': side + ' ' + speed + 'ms ease',
                    'transition': side + ' ' + speed + 'ms ease'
                };

            $menu.css(positionOffScreen);
            $menu.css(side, '-' + width);
            $canvas.css(side, '0');
            $menu.css(animateSlide);
            $canvas.css(animateSlide);

            $menu._state = 'closed';
            $menu.addClass('closed');

            $menu.open = function() {
                $menu._state = 'open';
                $menu.removeClass('closed');
                $menu.css(side, '0');
                $canvas.css(side, width);
            };

            $menu.close = function() {
                $menu._state = 'closed';
                $menu.addClass('closed');
                $menu.css(side, '-' + width);
                $canvas.css(side, '0');
            };

            if(s.initial){
                $this.on('click.navMobile', function(e) {
                    e.preventDefault();
                    if ($menu._state === 'closed') {
                        $menu.open();
                    } else {
                        $menu.close();
                    }
                });

                $this.on('touchend', function(e){
                    $this.trigger('click.navMobile');
                    e.preventDefault();
                });
            }



            return $menu;
        },

        stickyElements: function(options){

            var loptions = {
                config: {
                    debug: true
                },
                initial: false,
                stickNav: function(top,$nav){

                    //console.log('_lastScrollTop '+_lastScrollTop);
                    //console.log('_hpHeight '+_hpHeight);
                    //console.log('top '+top);
                    if (_scrolledContent && _lastScrollTop >= top && _lastScrollTop > _hpHeight) {
                        if($nav) $nav.addClass('sticky');
                    } else {
                        if($nav) $nav.removeClass('sticky');
                    }
                },
                fadeInNav: function($nav){
                    if($nav) $nav.addClass('fadeIn');
                },
                fadeOutNav: function($nav){
                    if($nav) $nav.removeClass('fadeIn');
                },
                fadeNavToggle: function($nav){
                    if(_isDesktop){
                        loptions.fadeInNav($nav);
                    }else{
                        loptions.fadeOutNav($nav);
                    }
                },
                checkContentVisible: function(){
                    return (_lastScrollTop >= top);
                }
            }, s = jde.merge(jde,loptions,options,{});


            return this.each( function() {

                var $this = $(this);

                try {


                    var top = _top,
                        idSnav = 'socialnav',
                        navheight = 43,
                        $socialnav = $('#'+idSnav),
                        $socialnavblock = $socialnav.find('ul.socialblock'),
                        $socialnavrow = $socialnav.find('ul.socialblock li.row'),
                        $socialnavlink = $socialnav.find('ul.socialblock a'),
                        $toplink = $('#footer').find('li.toplink a'),
                        $toplinktext = $toplink.text(),
                        newtoplink = '<div class="toTop"><a href="#content" id="toplink"><img src="/static/img/style/icon_to_top_link.png" alt="'+$toplinktext+'"></a></div>';

                    if(s.initial){

                        $this.addClass('stickyNav');
                        $('#content').append(newtoplink);
                        $('ul li.toplink').remove();

                        var $newtoplink = $('#content .toTop #toplink');
                        $newtoplink.addClass('sticky');

                        $newtoplink.on('click', function(e){
                            e.preventDefault();
                            $("#content").velocity("scroll",{ duration: 800, offset: -43 });
                            jde.set_newfocusObj($("#content a").filter(":visible").first());
                        });

                    }

                    s.stickNav(top,$this);                           /* sticky navmain */
                    s.stickNav(top+navheight, $socialnav);           /* sticky socialnav */
                    s.stickNav(top+navheight, $newtoplink);          /* sticky toplink */
                    s.fadeNavToggle($('#'+idSnav+'.sticky').find('ul.socialblock'));

                    if(s.initial) {
                        $socialnavrow.on({
                            'mouseenter': function (e) {
                                e.preventDefault();
                                if (!$(this).hasClass('fadeIn') && !$(this).closest('ul.socialblock').hasClass('fadeIn')) {
                                    s.fadeInNav($(this));
                                }
                            }, 'mouseleave': function (e) {
                                e.preventDefault();
                                if (!$(this).closest('ul.socialblock').hasClass('fadeIn')) {
                                    s.fadeOutNav($(this));
                                }
                            }

                        });

                        $socialnavlink.on({
                            'focus': function(e){
                                e.preventDefault();
                                if( !$(this).closest('li.row').hasClass('fadeIn') && !$(this).closest('ul.socialblock').hasClass('fadeIn') ){
                                    s.fadeInNav($(this).closest('li.row'));
                                }
                            },'blur': function(e){
                                e.preventDefault();
                                if( !$(this).closest('ul.socialblock').hasClass('fadeIn') ){
                                    s.fadeOutNav($(this).closest('li.row'));
                                }
                            }

                        });
                    }

                }catch(err){
                    s._debug(err);
                }

            });
        },
        update : function( content ) {

        },
        fallbackSetNewImage: function(){
            $('#homeswitch .teaser .image').css("background-image", "url(/static/img/style/hpimgfallback.png)");
        },
        setNewHomeImage: function(isrc){
            $('#homeswitch').find('.teaser .image').css("background-image", "url("+isrc+")");
        },
        loadHomeImage: function(isrc){
            var img = new Image();
            img.src = isrc;
            img.onload = function() {
                eak.setNewHomeImage(isrc);
            };
            img.onerror =function() {
                eak.fallbackSetNewImage;
            };
        },
        initAjaxNav: function(){
            var $nav = $('nav#navAjax'),
                $navSub = $("#navSub"),
                $content = $(ajaxContent);
            eak.ajaxifyMainNav($nav.find('a'));
            jde.aria_live($nav);
            jde.aria_live($navSub);
            jde.aria_live($content);

            History.Adapter.bind(window,'statechange',function() {

                try{
                    var State = History.getState(),// store the State object
                        data = State.data, // all the passed data is accessable here now
                        page = data.pageurl,
                        ptype = data.getAttr;

                    var jqxhr = $.getJSON( page+"?"+ptype, function() {
                        jde._debug( "json file loaded" );
                    })
                    .done(function(data) {

                        try{
                            var currClasses = $("body").attr('class'),
                                newClasses = data.bodyClasses;
                            $nav.find('ul').replaceWith(data.navMain);
                            $('#navAjaxMobile').find('ul').replaceWith(data.navMain);
                            $content.empty().append(data.content);
                            $navSub.empty().append(data.navSub);
                            _document.trigger('ajaxpage-load',{currClasses: currClasses, newClasses: newClasses});
                            eak.ajaxifyMainNav($nav.find('a'));


                        }catch(err){
                            jde._debug('History.Adapter.bind: done:'+err);
                            location.assign(State.url);
                        }
                    })
                    .fail(function() {
                        location.assign(State.url);
                    });
                }catch(err){
                    jde._debug('History.Adapter.bind:'+err);
                    location.assign(History.getState().data.pageurl);
                }

            });
        },
        ajaxifyMainNav: function($link) {

            $link.on('click', function(e){
                try{
                    if(_isDesktop && !($(this).attr('href').indexOf('#')==0)){
                        e.preventDefault();

                        // create an object to pass as state data
                        var data = {};
                        data.getAttr = "type=1425033112";
                        data.title = $(this).text()+ " : " +_customerTitle;
                        data.pageurl = $(this).attr('href');
                        document.title = data.title || document.title;
                        // update the url, preserve document title
                        History.pushState(data, document.title, data.pageurl);

                    }
                }catch(err){

                }


            });
        }
    };

    $.fn.getMethods = function(methodOrOptions) {

        if(eak[methodOrOptions]){

            return eak[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));

        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {

            /* Default "init" */
            return eak.init.apply( this, arguments );

        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist' );
        }

    };

    /* $('div').getMethods('hide');'*/



    /* + + + + + + + + + */
    /* dynamic Mobile Menu and Toggle Button uses global eak method navMobileSlide for OffCanvas Effect   */
    $.fn.navMobileBoard = function(options){
        var loptions = {
            config: {
                'debug'         : true,
                'navMobile'     : "#navMobile nav",
                'navMain'       : "#navMain nav",
                'navService'    : "#footer .navService",
                'navService2'   : "#navMain .servicelinks",
                'toggleLC'      : "#navMain #subMain"
            },
            cloneMenu: function($oldmenu, addEventHandler){
                return $oldmenu.clone(addEventHandler);
            }
        }, s = jde.merge(jde,loptions,options,{});
        /*s._debug(s._get_objVs(s));*/

        return this.each( function() {

            var $this = $(this);
            try {
                var toggleP     = '<p class="toggle"><a href="#menu" class="menuToggle">&#9776;</a></p>',
                    $toggleLC   = $(s.config.toggleLC),
                    $mobile     = $(s.config.navMobile),
                    $main       = s.cloneMenu($(s.config.navMain), false),
                    $service    = s.cloneMenu($(s.config.navService), false),
                    $service2   = s.cloneMenu($(s.config.navService2), false);

                    $mobile
                        .prepend($service2)
                        .prepend($service)
                        .prepend($main)
                        .find('p').remove();
                    $mobile.find('#navAjax').attr('id','navAjaxMobile');

                    $this.append(toggleP);
                    $toggleLC.prepend(toggleP);

                    $('a.menuToggle').getMethods('navMobileSlide', { initial: true });
                    if(_static) {
                        /* Kunden Preview */
                        $("#navMobile a[href='#'], #navMobile a[href='test.pdf']").on("click", preventClick);
                    }

            } catch (err) {
                s._debug(err);
            }
        });

    };

    /* + + + + + + + + + */
    /* social links behaviour */
    $.fn.socialNav = function(){
        var loptions = {
            config: {
                debug: false
            },
            setActive: function($item,$items){
                jde.change_tabindex($items,"",-1);
                $items.closest('li').removeClass('active');
                $item.closest('li').addClass('active');
            },
            removeActive: function($items){
                jde.change_tabindex($items,"",-1);
                $items.closest('li').removeClass('active');
            },
            isActive: function($l){
                return ($l.closest('li').hasClass('active'));
            },
            hasSubMenu: function(){
                return $('#subMenu').has('ul');
            }


        }, s = jde.merge(jde,loptions,wording,{});
        /*s._debug(s._get_objVs(s));*/

        return this.each(function() {
            var $this           = $(this),
                $servicelinks   = $this.find('li a'),
                $searchlink     = $this.find('li.service_icons_1 a'),
                $loginlink     = $this.find('li.service_icons_2 a'),
                $langlink       = $this.find('li.service_icons_3 a'),
                $serviceClone   = $('div#search form').clone(),
                $langClone      = $('div#subLang ul').clone(),
                $idmSearch      = "msearchword",
                $mSearchform    = null,
                $navSub         = $('#subMenu');

            try{
                $servicelinks.on({
                    'click': function(e){
                        e.preventDefault();
                        var $self = $(this);
                        if(!s.hasSubMenu()) {

                        }
                        $('.col_24 .servicesub').css('opacity', 0).hide();
                    }
                });



                $loginlink.on({
                    'click': function (e) {

                    }
                });
                $searchlink.on({
                    'click': function(e){

                        var $self = $(this),
                            sid = $self.attr('href');
                        e.preventDefault();
                        if(!s.isActive($self)){
                            $('.col_24 .servicesub').css('opacity', 0).hide();
                            $(sid).css('opacity', 0).show().animate({ 'opacity': 1 }, 400, function() {
                                s.setActive($self,$servicelinks);
                                s.set_newfocusObj($(sid+' label input'));
                            });
                        }else{
                            $(sid).css('opacity', 1).animate({ 'opacity': 0 }, 400, function() {
                                $(sid).hide();
                                s.removeActive($servicelinks);
                            });

                        }

                    }
                });

                try{
                    $langlink.closest('li').addClass('lang_'+lang);
                    $sublang = $($langlink.attr('href'));
                    $sublang.find("li[lang='"+lang+"']").hide();
                    if(lang == 'de'){
                        var prefix = s.general.change['de'] || "Switch to";
                        $sublang.find("li[lang='en']").prepend('<span class="langprefix">'+prefix+'</span>');
                    }else{
                        var prefix = s.general.change['en'] || "Wechseln zu";
                        $sublang.find("li[lang='de']").prepend('<span class="langprefix">'+prefix+'</span>');
                    }


                }catch(err){
                    s._debug(err);
                }

                $langlink.on({
                    'click': function(e){

                        var $self = $(this),
                            sid = $self.attr('href');
                        e.preventDefault();

                        if(!s.isActive($self)){
                            $('.col_24 .servicesub').css('opacity', 0).show();
                            $(sid).css('opacity', 0).show().animate({ 'opacity': 1 }, 400, function() {
                                s.setActive($self,$servicelinks);
                                s.set_newfocusObj($(sid+' a:first'));
                            });
                        }else{
                            $(sid).css('opacity', 1).animate({ 'opacity': 0 }, 400, function() {
                                $(sid).hide();
                                s.removeActive($servicelinks);
                            });

                        }

                    }
                });

                $langClone.appendTo($('#navMobile .servicelinks')).addClass('mlang').find("li").each(function() {
                    var $lang = $(this).attr('lang') || "",
                        $self = $(this);

                    if($lang.length > 0) {
                        var $langtxt = $self.text();
                        var prefix = s.general.change[$lang] || "Wechseln zu";
                        $self.find('a').empty().append('<abbr title="'+$langtxt+'">'+'<span class="out">'+prefix+'</span>'+$lang+'</abbr>');
                    }

                    if ($lang == lang) $self.css('display', 'none');
                    $mSearchform = $('#navMobile .servicelinks form');
                });
                $serviceClone.appendTo($('#navMobile .servicelinks')).css('display','none').find("*").each(function() {
                    var $id = this.id || "";
                    var $for = $(this).attr('for') || "";
                    if($id.length > 0) this.id = "m"+$id;
                    if($for.length > 0) {
                        $(this).attr('for',"m"+$for);
                        $idmSearch = "m"+$for;
                    }
                    $mSearchform = $('#navMobile .servicelinks form');
                });

                /* Shortcut Suchlink */
                $('#top a.search').click(function(e) {
                    e.preventDefault();
                    $mSearchform.css('display', 'block');
                    s.setActive($('#navMobile .service_icons_1 a'),$('#navMobile .service_icon a'));

                });
                /* Suchlink Mobile */
                $('#navMobile .service_icons_1 a').attr('href', $idmSearch).click(function(e) {
                    e.preventDefault();
                    $mSearchform.css('display', 'block');
                    s.setActive($(this),$(this).closest('ul').find('a'));
                    jde.set_newfocusId($idmSearch);

                });
                /*LogIn Mobile */
                $('#navMobile .service_icons_2 a').click(function(e) {
                    $mSearchform.css('display', 'none');
                    s.setActive($(this),$('#navMobile .service_icon a'));
                });
                /*Sprachwechsler Mobile */
                var langtxt = s.general.currLang[lang] || "Aktuelle Sprache "+lang;
                $('#navMobile .service_icons_3 a').click(function(e) {
                    $mSearchform.css('display', 'none');
                    s.setActive($(this),$('#navMobile .service_icon a'));
                    e.preventDefault();

                })/*.find('img').attr('alt',langtxt)*/;
            }catch(err){
                s._debug(err);
            }
        });
    };




})(jQuery);

