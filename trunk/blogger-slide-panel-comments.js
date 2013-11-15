// BLOGGER SLIDE PANEL COMMENTS
// http://gplus.to/tovic

jQuery(function() {
    jQuery(panelSelector).hide()
        .addClass('hompiPanel')
            .before('<a class="openpanel from-js" href="#">' + openPanelText + '<em></em></a>')
                .after('<div class="paneline"></div>');
    jQuery('.openpanel').toggle(function() {
        jQuery(this).addClass('active').html(closePanelText + '<em></em>');
        jQuery('div.hompiPanel').slideDown(slideDownPanelSpeed);
        return false;
    }, function() {
        jQuery(this).removeClass('active').html(openPanelText + '<em></em>');
        jQuery('div.hompiPanel').slideUp(slideUpPanelSpeed);
        return false;
    });
});