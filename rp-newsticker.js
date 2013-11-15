/*!
 * All in One Recent Post Widget for Blogger
 * Author: Taufik Nurrohman
 * URL: http://gplus.to/tovic
 */

/*
var spy_config = {
	widgetTitle: '<h2>Recent Post</h2>',
	url: 'http://dte-feed.blogspot.com',
	containerId: 'spy-outer',
	numPost: 10,
	numChars: 100,
	monthNames: [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	],
	noImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC',
	showSummaries: true,
	showThumbnails: true,
	showPostDate: true,
	showComments: true,
	newTabLink: false,
	animatedRecentPost: true,
	jsonCallback: 'recentpost_spy',
	newsTicker: {
		visible: 4,
		interval: 3000,
		speed: 600
	}
};
*/

(function(w, d) {
	$.fn.newsTicker = function(cfg) {
		cfg = $.extend({
			visible: 4,
			interval: 3000,
			speed: 600
		}, cfg);
		return this.each(function() {
			var $this = $(this),
				$list = $this.children(),
				anim = function() {
					$this.find('li:last').hide().prependTo($this).slideDown(cfg.speed);
				}, interval = w.setInterval(anim, cfg.interval);
			$this.css({
				'height': $list.outerHeight() * cfg.visible,
				'overflow': 'hidden'
			}).hover(function() {
				w.clearInterval(interval);
			}, function() {
				interval = setInterval(anim, cfg.interval);
			});
		});
	};
	var head = d.getElementsByTagName('head')[0],
		container = d.getElementById(spy_config.containerId);
	w[spy_config.jsonCallback] = function(json) {
		var skeleton = spy_config.widgetTitle + '<ul class="spy">',
			entry = json.feed.entry,
			date, title, link, summary, comment, img;
		for (var i = 0; i < spy_config.numPost; ++i) {
			date = entry[i].published.$t;
			title = entry[i].title.$t;
			var a = date.substring(0, 4),
				b = date.substring(5, 7),
				c = date.substring(8, 10);
			for (var j = 0, len = entry[i].link.length; j < len; ++j) {
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
			summary = ("summary" in entry[i]) ? entry[i].summary.$t : "";
			img = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url : spy_config.noImage;
			summary = summary.replace(/<br ?\/?>/ig, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "");
			if (summary.length > spy_config.numChars) summary = summary.substring(0, spy_config.numChars) + '&hellip;';
			skeleton += '<li>';
			skeleton += (spy_config.showThumbnails) ? '<div class="image-wrapper"><img src="' + img + '" alt="" width="72" height="72"></div>' : '';
			skeleton += '<a class="spy-header" href="' + link + '"' + (spy_config.newTabLink ? ' target="blank"' : '') + '>' + title + '</a>';
			skeleton += spy_config.showSummaries ? '<div class="spy-summary">' + summary : '';
			skeleton += spy_config.showPostDate ? ' <em>' + c + ' ' + spy_config.monthNames[(parseInt(b, 10) - 1)] + ' ' + a + '</em>' : '';
			skeleton += spy_config.showComments ? '<em> - ' + comment + '</em>' : '';
			skeleton += spy_config.showSummaries ? '</div>' : '';
			skeleton += '</li>';
		}
		container.innerHTML = skeleton + '</ul>';
		if (spy_config.animatedRecentPost) {
			$('#' + spy_config.containerId + ' ul').newsTicker({
				visible: spy_config.newsTicker.visible,
				interval: spy_config.newsTicker.interval,
				speed: spy_config.newsTicker.speed
			});
		}
		$(window).load(function() {
			$('#' + spy_config.containerId + ' img').each(function(i) {
				var $this = $(this);
				w.setTimeout(function() {
					$this.fadeIn(400);
				}, 400 * (i + 1));
			});
		});
	};
	var s = d.createElement('script');
	s.src = spy_config.url.replace(/\/$/, "") + '/feeds/posts/summary?alt=json-in-script&orderby=published&max-results=' + spy_config.numPost + '&callback=' + spy_config.jsonCallback;
	head.appendChild(s);
})(window, document);