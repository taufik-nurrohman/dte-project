// BLOGGER POPUP COMMENT FORM
// http://gplus.to/tovic

jQuery(function() {
    jQuery(popSelector).wrap('<div class="pop-form"></div>');
    jQuery('div.pop-form').hide().wrapInner('<div class="innerpop"></div>').append('<a href="#" class="close">&#215;</a><a class="closebutton">' + popCloseButtonText + '</a>');
    jQuery('div.pop-form').css({
        'position'    :'fixed',
        'top'         :'50%',
        'left'        :'50%',
        'margin-left' :-($('div.pop-form').outerWidth()/2),
        'margin-top'  :-($('div.pop-form').outerHeight()/2),
        'z-index'     :999,
        'display'     :'none'
    }).before('<a class="openform from-js" href="#">' + openformText + '</a>');

    jQuery('a.openform').live("click", function() {
        jQuery('body').append('<div id="poplay"></div>');
        jQuery('div.pop-form').fadeIn(popFadeSpeed);
        return false;
    });

    jQuery('div.pop-form a.close, div.pop-form a.closebutton').live("click", function() {
        jQuery(this).parents('div.pop-form').hide();
        jQuery('#poplay').remove();
        return false;
    });
});