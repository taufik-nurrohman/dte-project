/*
var tinycarousel_config = {
	url: 'http://dte-feed.blogspot.com',
	numPosts: 12,
	labelName: null,
	containerId: 'tinycarousel-container',
	newTabLink: false,
	summaryLength: 100,
	monthArray: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
	noImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC',
	nav: {
		prevText: '&lt;',
		nextText: '&gt;',
		showText: 'Menampilkan {num} Posting'
	},
	carousel: {
		axis: "x",
		itemwidth: 200,
		itemheight: 370,
		itemmargin: 5,
		itempadding:10,
		visible: 4,
		display: 1,
		start: 1,
		interval: true,
		intervaltime: 3000,
		animation: true,
		duration: 1000,
		easing: "swing",
		callback: null
	}
};
*/

/*!
 * Tiny Carousel 1.9
 * http://www.baijs.nl/tinycarousel
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 01 / 06 / 2011
 * Depends on library: jQuery
 * Modified by Taufik Nurrohman <http://gplus.to/tovic>
 */
(function($) {
 	$.tiny = $.tiny || {};
 	$.tiny.carousel = {
 		options: {
 			start: 1, // where should the carousel start?
 			display: 1, // how many blocks do you want to move at 1 time?
 			axis: 'x', // vertical or horizontal scroller? ( x || y ).
 			controls: true, // show left and right navigation buttons.
 			pager: false, // is there a page number navigation present?
 			interval: false, // move to another block on intervals.
 			intervaltime: 3000, // interval time in milliseconds.
 			animation: true, // false is instant, true is animate.
			easing: "swing", // animation easing type
 			duration: 1000, // how fast must the animation move in ms?
 			callback: null // function that executes after every move.
 		}
 	};
 	$.fn.tinycarousel = function(options) {
 		var options = $.extend({}, $.tiny.carousel.options, options);
 		this.each(function() {
 			$(this).data('tcl', new Carousel($(this), options));
 		});
 		return this;
 	};
 	$.fn.tinycarousel_start = function() {
 		$(this).data('tcl').start();
 	};
 	$.fn.tinycarousel_stop = function() {
 		$(this).data('tcl').stop();
 	};
 	$.fn.tinycarousel_move = function(iNum) {
 		$(this).data('tcl').move(iNum - 1, true);
 	};
 	function Carousel(root, options) {
 		var oSelf = this,
			oViewport = $('.tinycarousel-viewport:first', root),
			oContent = $('.tinycarousel-overview:first', root),
			oPages = oContent.children(),
			oBtnNext = $('.tinycarousel-button-next:first', root),
			oBtnPrev = $('.tinycarousel-button-prev:first', root),
			oPager = $('.tinycarousel-button-pager:first', root),
			iPageSize, iSteps, iCurrent, oTimer, bPause,
			bForward = true,
 			bAxis = options.axis == 'x';
 		function initialize() {
 			iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
 			var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) - 1);
 			iSteps = Math.max(1, Math.ceil(oPages.length / options.display) - iLeftover);
 			iCurrent = Math.min(iSteps, Math.max(1, options.start)) - 2;
 			oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length));
 			oSelf.move(1);
 			setEvents();
 			return oSelf;
 		}
 		function setEvents() {
 			if (options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0) {
 				oBtnPrev.click(function() {
 					oSelf.move(-1);
 					return false;
 				});
 				oBtnNext.click(function() {
 					oSelf.move(1);
 					return false;
 				});
 			}
 			if (options.interval) {
 				root.hover(oSelf.stop, oSelf.start);
 			}
 			if (options.pager && oPager.length > 0) {
 				$('a', oPager).click(setPager);
 			}
 		}
 		function setButtons() {
 			if (options.controls) {
 				oBtnPrev.toggleClass('disable', !(iCurrent > 0));
 				oBtnNext.toggleClass('disable', !(iCurrent + 1 < iSteps));
 			}
 			if (options.pager) {
 				var oNumbers = $('.tinycarousel-button-pager-num', oPager);
 				oNumbers.removeClass('active');
 				$(oNumbers[iCurrent]).addClass('active');
 			}
 		}
 		function setPager(oEvent) {
 			if ($(this).hasClass('tinycarousel-button-pager-num')) {
 				oSelf.move(parseInt(this.rel), true);
 			}
 			return false;
 		}
 		function setTimer() {
 			if (options.interval && !bPause) {
 				clearTimeout(oTimer);
 				oTimer = setTimeout(function() {
 					iCurrent = iCurrent + 1 == iSteps ? -1 : iCurrent;
 					bForward = iCurrent + 1 == iSteps ? false : iCurrent == 0 ? true : bForward;
 					oSelf.move(bForward ? 1 : -1);
 				}, options.intervaltime);
 			}
 		}
 		this.stop = function() {
 			clearTimeout(oTimer);
 			bPause = true;
 		};
 		this.start = function() {
 			bPause = false;
 			setTimer();
 		};
 		this.move = function(iDirection, bPublic) {
 			iCurrent = bPublic ? iDirection : iCurrent += iDirection;
 			if (iCurrent > -1 && iCurrent < iSteps) {
 				var oPosition = {};
 				oPosition[bAxis ? 'left' : 'top'] = -(iCurrent * (iPageSize * options.display));
 				oContent.animate(oPosition, {
 					queue: false,
 					duration: options.animation ? options.duration : 0,
					easing: options.easing,
 					complete: function() {
 						if (typeof options.callback == 'function') options.callback.call(this, oPages[iCurrent], iCurrent);
 					}
 				});
 				setButtons();
 				setTimer();
 			}
 		};
 		return initialize();
 	};
})(jQuery);

/* Blogger TinyCarousel by Taufik Nurrohman <http://gplus.to/tovic> */
(function(w, d) {
	var tc = tinycarousel_config,
		head = d.getElementsByTagName('head')[0],
		s = d.createElement('script'),
		container = document.getElementById(tc.containerId);
	w.bloggerTinyCarousel = function(json) {
		var entry = json.feed.entry, link, title, summary, image, comment, date,
			skeleton = '<div class="tinycarousel-viewport' + (tc.carousel.axis == 'y' ? ' vertical' : ' horizontal') + '" style="width:' + (tc.carousel.axis == 'x' ? ((tc.carousel.itemwidth + tc.carousel.itemmargin) * tc.carousel.visible) + tc.carousel.itemmargin : tc.carousel.itemwidth + (tc.carousel.itemmargin * 2)) + 'px;height:' + (tc.carousel.axis == 'y' ? (tc.carousel.itemheight * tc.carousel.visible) - (tc.carousel.itemmargin * (tc.carousel.visible - 1)) : tc.carousel.itemheight) + 'px;"><ul class="tinycarousel-overview">';
		for (var i = 0, ien = entry.length; i < ien; ++i) {
			title = entry[i].title.$t;
			date = entry[i].published.$t;
			var date_a = date.split('-')[2].substring(0, 2),
				date_b = date.split('-')[1],
				date_c = date.split('-')[0];
			for (var j = 0, jen = entry[i].link.length; j < jen; ++j) {
				if (entry[i].link[j].rel == "alternate") {
					link = entry[i].link[j].href;
					break;
				}
			}
			for (var k = 0, ken = entry[i].link.length; k < ken; ++k) {
				if (entry[i].link[k].rel == "replies" && entry[i].link[k].type == "text/html") {
					comment = entry[i].link[k].title;
					break;
				}
			}
			image = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url.replace(/\/s72-c/, "/s" + (tc.carousel.itemwidth - (tc.carousel.itempadding * 2)) + "-c") : tc.noImage;
			summary = ("summary" in entry[i]) ? entry[i].summary.$t.replace(/<br ?\/?>/ig, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "") : "";
			summary = (tc.summaryLength < summary.length) ? summary.substring(0, tc.summaryLength) + '&hellip;' : summary;
			skeleton += '<li style="width:' + tc.carousel.itemwidth + 'px;margin:' + tc.carousel.itemmargin + 'px;margin-' + (tc.carousel.axis == 'x' ? 'right' : 'bottom') + ':0;height:' + (tc.carousel.itemheight - (tc.carousel.itemmargin * 2)) + 'px;"><div class="tinycarousel-inner" style="height:' + (tc.carousel.itemheight - (tc.carousel.itemmargin * 2)) + 'px;"><a href="' + link + '"' + (tc.newTabLink ? ' target="_blank"' : '') + '><img src="' + image + '" alt="' + title + '" class="tinycarousel-image"></a><h4 class="tinycarousel-title"><a href="' + link + '"' + (tc.newTabLink ? ' target="_blank"' : '') + '>' + title + '</a></h4><p class="tinycarousel-summary">' + summary + '</p><div class="tinycarousel-footer tinycarousel-footer-date">' + date_a + ' ' + tc.monthArray[parseInt(date_b, 10) - 1] + ' ' + date_c + '</div><div class="tinycarousel-footer tinycarousel-footer-comment">' + comment + '</div></div></li>';
		}
		skeleton += '</ul></div><div class="tinycarousel-navigation" style="width:' + (tc.carousel.axis == 'x' ? ((tc.carousel.itemwidth + tc.carousel.itemmargin) * tc.carousel.visible) + tc.carousel.itemmargin : tc.carousel.itemwidth + (tc.carousel.itemmargin * 2)) + 'px;"><div class="tinycarousel-inner"><a class="tinycarousel-button tinycarousel-button-prev" href="#prev">' + tc.nav.prevText + '</a><a class="tinycarousel-button tinycarousel-button-next" href="#next">' + tc.nav.nextText + '</a><span class="tinycarousel-total-posts">' + tc.nav.showText.replace(/\{num\}/g, tc.numPosts) + '</span></div></div></div>';
		container.innerHTML = skeleton;
		$('#' + tc.containerId).addClass(tc.carousel.axis == 'y' ? 'vertical' : 'horizontal').tinycarousel(tc.carousel);
	};
	s.src = tc.url.replace(/\/$/, "") + '/feeds/posts/summary' + (tc.labelName !== null ? '/-/' + tc.labelName : "") + '?alt=json-in-script&orderby=published&max-results=' + tc.numPosts + '&callback=bloggerTinyCarousel';
	head.appendChild(s);
})(window, document);