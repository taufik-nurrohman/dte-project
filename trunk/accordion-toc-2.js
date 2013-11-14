/*!
 * BLOGGER TOC WITH ACCORDION EFFECT (SORT BY DATE PUBLISHED)
 * ---------------------------------------------------
 * by Taufik Nurrohman
 * URL: http://gplus.to/tovic
 * ---------------------------------------------------
 */

/*
var toc_config = {
	url: 'http://dte-feed.blogspot.com',
	containerId: 'table-of-content',
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
	oldestFirst: false,
	maxResults: 9999,
	activePanel: 1,
	slideSpeed: {
		down: 400,
		up: 400
	},
	slideEasing: {
		down: null,
		up: null
	},
	slideCallback: {
		down: function() {},
		up: function() {}
	},
	clickCallback: function() {},
	jsonCallback: '_toc',
	delayLoading: 0
};
*/

(function(w, d) {
	var tocContainer = d.getElementById(toc_config.containerId),
		head = d.getElementsByTagName('head')[0],
		postTitle = [],
		postUrl = [],
		postDate = [],
		postMonth = [],
		postYearMonth = [],
		postDateNum = [],
		postISODate = [],
		monthArray = toc_config.monthNames,
		title, link;
	w[toc_config.jsonCallback] = function(json) {
		if ("entry" in json.feed) {
			var entry = (toc_config.oldestFirst) ? json.feed.entry.reverse() : json.feed.entry;
			for (var i = 0, ien = entry.length; i < ien; ++i) {
				title = entry[i].title.$t,
					isoDate = entry[i].published.$t,
					a = isoDate.substring(0,10),
					b = isoDate.substring(5,7),
					c = isoDate.substring(8,10),
					pub = monthArray[parseInt(b,10) - 1] + " " + isoDate.substring(0,4),
					date = "/" + isoDate.substring(0,4) + "_" + b + "_01_archive.html";
				for (var j = 0, jen = entry[i].link.length; j < jen; ++j) {
					if (entry[i].link[j].rel == "alternate") {
						link = entry[i].link[j].href;
						break;
					}
				}
				postTitle.push(title);
				postDate.push(a);
				postISODate.push(isoDate);
				postUrl.push(link);
				postYearMonth.push(pub);
				postDateNum.push(c);
			}
		}
		displayToc();
	};
	function displayToc() {
		var a = 0, b = 0, skeleton = "";
		while (b < postTitle.length) {
			temp = postYearMonth[b].replace(/\'/g,"&apos;").replace(/\"/g,"&quot;");
			skeleton += '<h3 class="toc-header">' + temp + '</h3>';
			skeleton += '<div class="toc-content"><ol>';
			do {
				skeleton += '<li>';
				skeleton += '<time title="' + postISODate[a] + '" datetime="' + postISODate[a] + '">' + postDateNum[a] + ' ' + temp + '</time> :: <a title="' + postTitle[a] + '" href="' + postUrl[a] + '" >' + postTitle[a] + '</a>';
				skeleton += '</li>';
				a = a + 1;
			} while (postYearMonth[a] == temp);
			b = a;
			skeleton += '</ol></div>';
			if (b > postTitle.length) break;
		}
		tocContainer.innerHTML = skeleton;
		if (typeof jQuery != 'undefined') {
			$('#' + toc_config.containerId + ' .toc-content').hide();
			$('#' + toc_config.containerId + ' .toc-header').click(function() {
				if ($(this).hasClass('active')) return;
				toc_config.clickCallback(this);
				$('#' + toc_config.containerId + ' .toc-header').removeClass('active').next().slideUp(toc_config.slideSpeed.up, toc_config.slideEasing.up, toc_config.slideCallback.up);
				$(this).addClass('active').next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down);
			}).eq(toc_config.activePanel - 1).addClass('active').next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down);
		}
	}
	var s = d.createElement('script');
		s.src = toc_config.url.replace(/\/$/, "") + '/feeds/posts/summary/?alt=json-in-script&orderby=published&max-results=' + toc_config.maxResults + '&callback=' + toc_config.jsonCallback;
	if (toc_config.delayLoading == "onload") {
		w.onload = function() {
			head.appendChild(s);
		};
	} else {
		w.setTimeout(function() {
			head.appendChild(s);
		}, toc_config.delayLoading);
	}
})(window, document);