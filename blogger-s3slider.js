/*
var s3slider_config = {
	url: 'http://dte-feed.blogspot.com',
	numPost: 7,
	labelName: null,
	monthArray: [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember"
	],
	noImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC',
	newTabLink: false,
	containerId: 's3slider-container',
	slider: {
		width: 420,
		height: 270,
		timeOut: 4000
	}
};
*/

/* ------------------------------------------------------------------------

s3Slider

Developped By: Boban KariÅ¡ik -> http://www.serie3.info/
CSS Help: MÃ©szÃ¡ros RÃ³bert -> http://www.perspectived.com/
Version: 1.0

Copyright: Feel free to redistribute the script/modify it, as
           long as you leave my infos at the top.

Modified by Taufik Nurrohman <http://gplus.to/tovic>

-------------------------------------------------------------------------- */
(function($) {
	$.fn.s3Slider = function(vars) {
		var element = this,
			timeOut = (vars.timeOut != undefined) ? vars.timeOut : 4000,
			current = null,
			timeOutFn = null,
			faderStat = true,
			mOver = false,
			items = $(element).find('li'),
			itemsSpan = items.find('.s3slider-caption');
		items.each(function(i) {
			$(items[i]).mouseover(function() {
				mOver = true;
			});
			$(items[i]).mouseout(function() {
				mOver = false;
				fadeElement(true);
			});
		});
		var fadeElement = function(isMouseOut) {
			var thisTimeOut = (isMouseOut) ? (timeOut / 2) : timeOut;
			thisTimeOut = (faderStat) ? 10 : thisTimeOut;
			if (items.length > 0) {
				timeOutFn = setTimeout(makeSlider, thisTimeOut);
			} else {
				// console.log("Poof..");
			}
		}, makeSlider = function() {
			current = (current != null) ? current : items[(items.length - 1)];
			var currNo = jQuery.inArray(current, items) + 1
			currNo = (currNo == items.length) ? 0 : (currNo - 1);
			var newMargin = $(element).width() * currNo;
			if (faderStat == true) {
				if (!mOver) {
					$(items[currNo]).fadeIn((timeOut / 6), function() {
						if ($(itemsSpan[currNo]).is(':visible')) {
							$(itemsSpan[currNo]).slideUp((timeOut / 6), function() {
								faderStat = false;
								current = items[currNo];
								if (!mOver) {
									fadeElement(false);
								}
							});
						} else {
							$(itemsSpan[currNo]).slideDown((timeOut / 6), function() {
								faderStat = false;
								current = items[currNo];
								if (!mOver) {
									fadeElement(false);
								}
							});
						}
					});
				}
			} else {
				if (!mOver) {
					if ($(itemsSpan[currNo]).is(':hidden')) {
						$(itemsSpan[currNo]).slideDown((timeOut / 6), function() {
							$(items[currNo]).fadeOut((timeOut / 6), function() {
								faderStat = true;
								current = items[(currNo + 1)];
								if (!mOver) {
									fadeElement(false);
								}
							});
						});
					} else {
						$(itemsSpan[currNo]).slideUp((timeOut / 6), function() {
							$(items[currNo]).fadeOut((timeOut / 6), function() {
								faderStat = true;
								current = items[(currNo + 1)];
								if (!mOver) {
									fadeElement(false);
								}
							});
						});
					}
				}
			}
		}; makeSlider();
	};
})(jQuery);

/* s3Slider for Blogger by Taufik Nurrohman <http://gplus.to/tovic> */
(function($, w, d) {
	var sc = s3slider_config,
		container = d.getElementById(sc.containerId),
		head = d.getElementsByTagName('head')[0],
		s = d.createElement('script'),
		skeleton = '<div class="s3slider" id="s3slider" style="width:' + sc.slider.width + 'px;height:' + sc.slider.height + 'px;"><ul class="s3slider-content">',
		title, image, link, date, comment;
	w.blogger_s3Slider = function(json) {
		var entry = json.feed.entry;
		for (var i = 0, ien = entry.length; i < ien; ++i) {
			title = entry[i].title.$t;
			date = entry[i].published.$t.split('-');
			var dd = date[2].substring(0, 2),
				dm = date[1],
				dy = date[0];
			image = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url.replace(/\/s[0-9]+\-c/, "/s" + sc.slider.width) : sc.noImage;
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
			skeleton += '<li><img src="' + image + '" style="display:block;width:' + sc.slider.width + 'px;min-height:' + sc.slider.height + 'px;height:auto;"><span class="s3slider-caption"><span class="s3slider-title"><a href="' + link + '"' + (sc.newTabLink ? ' target="_blank"' : "") + '>' + title + '</a><span class="s3slider-meta"><span class="s3slider-meta-date">' + dd + ' ' + sc.monthArray[parseInt(dm, 10) - 1] + ' ' + dy + '</span><span class="s3slider-meta-comment">' + comment + '</span></span></span></li>';
		}
		skeleton += '</ul></div>';
		container.innerHTML = skeleton;
		$('#' + sc.containerId).children().s3Slider({
			timeOut: sc.slider.timeOut
		});
	};
	s.src = sc.url.replace(/\/$/, "") + '/feeds/posts/summary' + (sc.labelName !== null ? '/-/' + sc.labelName : "") + '?alt=json-in-script&orderby=published&max-results=' + sc.numPost + '&callback=blogger_s3Slider';
	head.appendChild(s);
})(jQuery, window, document);