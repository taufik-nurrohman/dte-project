// JQuery Toggle Sidebar Plugin by Taufik Nurrohman
// https://plus.google.com/108949996304093815163/about
// See: http://jsfiddle.net/tovic/z9Nen/embedded/result,js,html,css/
// or http://www.dte.web.id/2012/07/toggle-sidebar-dengan-jquery.html

(function($) {
	$.fn.toggleSidebar = function(config) {

		config = $.extend({
			expand: "#main-wrapper",  // Your expandable element
			hideText: "Hide Sidebar", // Toggle button label when the sidebar is visible
			showText: "Show Sidebar", // Toggle button label when the sidebar is hidden
			animated: false, // If true, then the animation will be enabled
			animateSpeed: 400, // Your animation speed
			extraWidth: 0,
			easingType: null, // Your animation easing type
			enableCookie: false, // If `true`, the browser will save the 'hidden/visible sidebar' session
			cookieName: 'sidebar-session', // Name of the sidebar session cookie
			expires: 7000, // Cookie expired time in day
			insertNav: true, // Automatically insert a toggle button above the sidebar (column)
			defaultHidden: false // If `true`, the sidebar will hidden by default
		}, config);

		// Build a toggle button above the sidebar
		$(config.expand).before(config.insertNav ? '<div id="sidebar-toggler-wrapper"><a class="sidebar-toggler from-js" href="#">' + config.hideText + '</a><div style="clear:both;"></div></div>' : '');

		var $this = this,
			$toggler = $('.sidebar-toggler'),
			sidebarWidth = $this.outerWidth(true) + config.extraWidth, // width + padding + border-width (if any) + extra_width
			expanderWidth = $(config.expand).width(), // width
			fnGroup = {
				createCookie: function(name, value, days) {
					if (days) {
						var date = new Date();
						date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
						var expires = "; expires=" + date.toGMTString();
					} else {
						var expires = "";
					}
					document.cookie = name + "=" + value + expires + "; path=/";
				},
				readCookie: function(name) {
					var nameEQ = name + "=";
					var ca = document.cookie.split(';');
					for (var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0) == ' ') c = c.substring(1, c.length);
						if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
					}
					return null;
				},
				eraseCookie: function(name) {
					this.createCookie(name, "", -1);
				},
				hideSidebar: function() {
					$toggler.addClass('active').html(config.showText);
					if (config.animated) {
						$this.stop(true,true).fadeOut(config.animateSpeed/2, function() {
							$(config.expand).animate({width:expanderWidth+sidebarWidth}, config.animateSpeed, config.easingType);
						});
					} else {
						$this.hide();
						$(config.expand).css('width', expanderWidth+sidebarWidth);
					}
					if (config.enableCookie) {
						if (!config.defaultHidden) {
							this.createCookie(config.cookieName, null, config.expires);
						} else {
							this.eraseCookie(config.cookieName);
						}
					}
				},
				showSidebar: function() {
					$toggler.removeClass('active').html(config.hideText);
					if(config.animated) {
						$(config.expand).stop().animate({width:expanderWidth}, config.animateSpeed, config.easingType, function() {
							$this.fadeIn(config.animateSpeed);
						});
					} else {
						$this.show();
						$(config.expand).css('width', expanderWidth);
					}
					if (config.enableCookie) {
						if (!config.defaultHidden) {
							this.eraseCookie(config.cookieName);
						} else {
							this.createCookie(config.cookieName, null, config.expires);
						}
					}
				}
			};

		$toggler.on("click", function() {
			fnGroup[$this.is(':hidden') ? "showSidebar" : "hideSidebar"]();
			return false;
		});

		// Show or hide the sidebar on initiation by cookie
		if (config.defaultHidden) {
			$this[fnGroup.readCookie(config.cookieName) ? "show" : "hide"]();
			$(config.expand).css('width', (fnGroup.readCookie(config.cookieName) ? expanderWidth : expanderWidth+sidebarWidth));
			fnGroup[!fnGroup.readCookie(config.cookieName) ? "hideSidebar" : "showSidebar"]();
		} else {
			$this[fnGroup.readCookie(config.cookieName) ? "hide" : "show"]();
			$(config.expand).css('width', (fnGroup.readCookie(config.cookieName) ? expanderWidth+sidebarWidth : expanderWidth));
			fnGroup[fnGroup.readCookie(config.cookieName) ? "hideSidebar" : "showSidebar"]();
		}

	};
})(jQuery);