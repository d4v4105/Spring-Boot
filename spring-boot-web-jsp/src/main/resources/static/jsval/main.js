
/*
 Syntax highlighting
 */
$('.convert-code').each(function() {
    var html = this.innerHTML;
    $(this)
        .html('')
        .text($.trim(html))
        .show();
});
if( navigator.userAgent.indexOf('MSIE') > -1 ) {
    $('.prettyprint').addClass('linenums'); // IE must have line numbers or line breaks will disappear
}
$('.prettyprint').each(function() {
    var code = $(this).text().replace(new RegExp('    ', 'g'), '  ');
    code = code.replace(new RegExp('break=""', 'gi'), '\n\t\t');
    $(this).text( code );
});
prettyPrint();


/*
 Setup form validation
 */
$.validate({
    form : '.test-form:not(.top-messages)',
    modules : 'date, security, location, date, sweden, uk, file',
    onModulesLoaded: function($form) {
        $('input[name="country"]').suggestCountry();
        $('input[name="state"]').suggestState();
        $('input[name="lan"]').suggestSwedishCounty();
        $('input[name="kommun"]').suggestSwedishMunicipality();
        $('input[name="pass_confirmation"]').displayPasswordStrength();
    },
    onError : function() {
        if( !$.formUtils.haltValidation ) {
            alert('Form is NOT valid :(');
        }
    },
    onSuccess: function($form) {

        // if "validate_backend" is encountered the form will be validated
        // twice, the first time $.formUtils.haltValidation will be set to true
        if( !$.formUtils.haltValidation ) {
            alert('Form is valid :)');

            // The input button is disabled if the form contains backend validations
            $form.find('input[type="submit"]').unbind('click');
        }
        return false;
    }
});

/*
  Setup form validation with error messages in top
*/
$.validate({
    form : '.test-form.top-messages',
    scrollToTopOnError: false,
    validateOnBlur: false,
    errorMessagePosition: 'top',
    onSuccess : function() {
        alert('The form is valid :)');
        return false;
    }
});

/*
 Length restrictions
 */
$('.length-restricted').each(function() {
    var $maxLen = $(this).parent().parent().parent().find('.max-chars');
    $(this).restrictLength($maxLen);
});

/*
 Preload some images that is used in the form
 */
$.each(['img/icon-fail.png', 'img/icon-ok.png'], function(i, imgSource) {
    $('<img />')
        .css({
            position : 'absolute',
            top: '-100px',
            left: '-100px'
        })
        .appendTo('body')
        .get(0).src = imgSource;
});

/*
 Page switcher
 */
var Pager = {

    currentPage : false,

    lastSection : false,

    isChangingPage : false,

    isFirstLoad : true,

    goTo : function(page, callback, args) {

        var pageSection = false;
        if( page.indexOf('_') > -1 ) {
            pageSection = page.split('_')[1];
            page = page.split('_')[0];
        }

        var $newPage = $('#'+page);
        if( !$newPage.hasClass('page') ) {
            if( !$newPage.is(':visible') ) {
                return this.goTo('home', callback);
            } else {
                return true;
            }
        }

        if( !this.isChangingPage && (page != this.currentPage || pageSection) ) {

            if( $newPage.length > 0 ) {
                this.isChangingPage = true;

                var nextPage = function() {

                    var nextPageLoaded = function() {
                        Pager.isChangingPage = false;
                        if( pageSection ) {
                            // window.location.hash = '#' + Pager.currentPage;
                            Pager.lastSection = pageSection;
                            var $section = $('*[data-page-section="'+pageSection+'"]');
                            $('html, body').animate({
                                scrollTop: $section.offset().top - 50
                            }, 500);
                        }
                        else {
                            $('html, body').animate({
                                scrollTop: 0
                            }, 0);
                        }

                        $(window).trigger('pageChange', [page, args, pageSection]);

                        if( Pager.isFirstLoad ) {
                            Pager.isFirstLoad = false;
                        }
                    };

                    if( page != Pager.currentPage ) {
                        $newPage.fadeIn('normal', nextPageLoaded);
                    } else {
                        nextPageLoaded();
                    }

                    Pager.currentPage = page;
                    if( typeof callback == 'function' ) {
                        callback();
                    }
                };

                if( this.currentPage && page != Pager.currentPage ) {
                    $('#'+this.currentPage).fadeOut('fast', nextPage);
                } else {
                    nextPage();
                }
            }
        } else if(page == this.currentPage) {
            $(window).trigger('pageChange', [page, args]);
        }
        return false;
    }
};

/*
Reload ad
 */
$(window).on('pageChange', function(evt, page, args, pageSection) {
    if( !Pager.isFirstLoad && !pageSection )
        $('#ad-wrapper').html('<div id="carbonads-container"><div class="carbonad"><div id="azcarbon"></div><script type="text/javascript">var z = document.createElement("script"); z.type = "text/javascript"; z.async = true; z.src = "http://engine.carbonads.com/z/58315/azcarbon_2_1_0_VERT"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(z, s);</script></div></div>');
});

/*
 Setup pager
 */
var $pages = $('.page');
$pages.fadeOut('fast');

var $subMenus = $('.submenu'),
    $menuLinks = $('.nav a'),
    $subMenuLinks = $('.menu-link'),
    registerPageView = function(url) {
        if( !url )
            url = window.location.pathname + window.location.search + window.location.hash;
        if( typeof window.ga == 'function' ) {
            ga('send', 'pageview', url);
        } else {
            console.log('Would register page view for '+url+' in production');
        }
    };

/*
  When page is changed
 */
$(window).bind('hashchange', function() {

    // Track page view
    registerPageView();
    var href = window.location.hash.substr(1),
        args = href.split('=')[1];

    href = href.split('=')[0];

    return Pager.goTo(href, function() {

        var pageRef = Pager.currentPage;

        $menuLinks.parent().removeClass('active');
        $menuLinks.filter('[href="#'+pageRef+'"]').eq(0).parent().addClass('active');
        $subMenuLinks.find('.arr').html('&#9650;');

        var $currentMenu = $subMenus.filter(':visible');
        if( !($currentMenu.hasClass('default-validators') && (pageRef == 'home' || pageRef == 'default-validators')) )
            $currentMenu.slideUp();

        if( pageRef == 'home' )
            pageRef = 'default-validators';

        $subMenuLinks.filter('[href="#'+pageRef+'"]').find('.arr').html('&#9660;');
        $subMenus.filter('.'+pageRef).slideDown();

    }, args);
});

/*
 After the first page is loaded
 */
var onFirstPageLoaded = function() {
    if( Pager.currentPage == 'home' || Pager.currentPage == 'default-validators' ) {
        $subMenus.filter(':not(.default-validators)').slideUp();
        $subMenuLinks.filter('[href="#default-validators"]').find('.arr').html('&#9660;');
    } else {
        $subMenus.filter(':not(.'+Pager.currentPage+')').slideUp();
        $subMenuLinks.filter('[href="#'+Pager.currentPage+'"]').find('.arr').html('&#9660;');
    }

    if( Pager.currentPage != 'home' ) {
        $menuLinks.parent().removeClass('active');
        $menuLinks.filter('[href="#'+Pager.currentPage+'"]').eq(0).parent().addClass('active');
    }
};

var $downloadInfo = $('#download-info');
$('#download-link').click(function() {
    if( $downloadInfo.is(':visible') ) {
        $(this).removeClass('active');
        $downloadInfo.animate({height: '0'}, 'normal', function() {
            $(this).hide();
        });
    } else {
        $(this).addClass('active');
        $downloadInfo.show().animate({ height: '450px' });
    }
    return false;
});
$downloadInfo.animate({ height: 0 });

$('#home').find('.click-download').click(function() {
    $('#download-link').trigger('click');
    return false;
});


var $search = $('.search-wrapper'),
    PageSearch = {

    $result : $('#search-result'),

    search : function(str) {
        str = $.trim(str.toLocaleLowerCase());

        var resultLinks = {},
            _search = function(str, addToResultLinks) {

            var result = [];

            $pages.filter(':not(#search)').each(function() {

                var link = $(this).attr('id'),
                    id = link,
                    $children = $(this).children(),
                    i,
                    paragraph = false,
                    pageName = false,
                    relevance = 0;

                for(i=0; i < $children.length; i++) {
                    var $elem = $children.eq(i),
                        section = $elem.attr('data-page-section'),
                        nodeName = $elem.get(0).nodeName;

                    if( nodeName == 'PRE' || nodeName == 'CODE' )
                        continue;

                    if( section ) {
                        // Collect result form previous section
                        if( relevance ) {
                            var found = {
                                    relevance : relevance,
                                    link : link,
                                    paragraph : paragraph,
                                    pageName : pageName
                                },
                                added = false;

                            if( addToResultLinks )
                                resultLinks[link] = 1;

                            $.each(result, function(i, obj) {
                                if( found.relevance > obj.relevance ) {
                                    added = true;
                                    result.splice(i, 0, found);
                                    return false;
                                }
                            });
                            if( !added ) {
                                result.push(found);
                            }
                        }
                        relevance = 0;
                        link = id +'_'+section;
                        paragraph = false;
                        pageName = false;
                    }

                    if( !pageName && (nodeName == 'H1' || nodeName == 'H2' || nodeName == 'H3') ) {
                        pageName = $elem.text();
                    }

                    var html = $elem.html().toLocaleLowerCase();
                    relevance += html.split(str).length - 1;

                    if( relevance && !paragraph ) {
                        paragraph = $.trim($('<div>'+html+'</div>').text()).replace(new RegExp(str, 'g'), '<strong class="found">'+str+'</strong>');
                    }
                }

            });

            return result;
        };

        var totalResults = _search(str, true),
            words = str.split(' ');

        if( words.length ) {
            $.each(words, function(i, w) {
                var found = _search(w),
                    added = 0;
                $.each(found, function(i, resultItem) {
                    if( !(resultItem.link in resultLinks) ) {
                        added++;
                        resultLinks[resultItem.link] = 1;
                        totalResults.push(resultItem);
                    }
                });
            })
        }

        return totalResults.splice(0, 100);
    },

    onPageSearch : function(evt, path, args) {
        if( path == 'search' ) {
            $search.find('input').val(args);
            var result = PageSearch.search(args);
            PageSearch.$result.html('').append('<p>Found '+result.length+' matching results</p>');
            $.each(result, function(i, item) {
                $('<div><h3><a href="#'+item.link+'">' +item.pageName+'</a></h3><p>'+item.paragraph+'</p></div>')
                    .appendTo(PageSearch.$result);
            });
        }
    },

    init : function() {
        $search.find('label').on('click', function() {
            var val = $.trim($(this).parent().find('input').val());
            if( val.length > 1 ) {
                window.location = '#search='+val;
                Pager.goTo('search', {}, val);
            }
        });
        $search.find('input').on('keydown', function(evt) {
            if( evt.keyCode == 13 ) {
                $(this).parent().find('label').trigger('click');
            }
        });
    }

};

$(window).on('pageChange', PageSearch.onPageSearch);
PageSearch.init();

/*
 Current page when page loads
 */
if( window.location.hash ) {
    var href = window.location.hash.substr(1);
    Pager.goTo(href.split('=')[0], onFirstPageLoaded, href.split('=')[1]);
} else {
    Pager.goTo('home', onFirstPageLoaded);
}
