/*!
 * JQuery MyTooltip Plugin by Taufik Nurrohman
 * https://plus.google.com/108949996304093815163/about
 * Licence: http://creativecommons.org/licenses/by-sa/3.0/
 */

(function($) {
    $.fn.myTooltip = function(n,o) {
        n = n || "title";
        o = jQuery.extend({
            top: 20,
            left: 20,
            fade: false,
            time: 200
        }, o);

        return this.each(function() {
            var ww = $(window).width(),
                wh = $(window).height();
            $(window).resize(function() {
                ww = $(this).width(),
                wh = $(this).height();
            });
            $(this).on({
                mouseenter:function(e) {
                    var t = $(this).attr(n),
                        tp = e.pageY,
                        lp = e.pageX;
                    $(document.body).append('<span class="tooltip" style="position:absolute;z-index:99999;display:none;">'+t+'</span>');
                    if(o.fade) {
                        $('.tooltip').fadeIn(o.time);
                    } else {
                        $('.tooltip').show();
                    }
                    if($(this).attr('data-custom')) {
                        $('.tooltip').addClass($(this).data('custom'));
                    }
                    var ew = $('.tooltip').outerWidth()+30;
                    $(this).removeAttr(n).mousemove(function(e) {
                        var tp = e.pageY,
                            lp = e.pageX;
                        if(lp+ew > ww) {
                            lp = ww-ew-o.left;
                        }
                        $('.tooltip').offset({top:tp+o.top,left:lp+o.left});
                    });
                },
                mouseleave:function() {
                    $(this).attr(n, $('.tooltip').html());
                    $('.tooltip').remove();
                }
            });
        });

    };
})(jQuery);