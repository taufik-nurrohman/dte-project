/*! Related Post Widget for Blogger by Taufik Nurrohman => http://gplus.to/tovic */
var randomRelatedIndex, showRelatedPost;
(function(a, b, c) {
	var def = {
		widgetTitle: "<h4>Artikel Terkait:</h4>",
		widgetStyle: 1,
		homePage: "http://www.dte.web.id",
		numPosts: 7,
		summaryLength: 370,
		titleLength: "auto",
		thumbnailSize: 72,
		noImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",
		containerId: "related-post",
		newTabLink: false,
		moreText: "Baca Selengkapnya",
		callBack: function() {}
	};
	for (var i in relatedPostConfig) {
		def[i] = (relatedPostConfig[i] == 'undefined') ? def[i] : relatedPostConfig[i];
	}
	var lo = function(url) {
		var s = b.createElement('script');
		s.type = "text/javascript";
		s.src = url;
		c.appendChild(s);
	}, ri = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}, shu = function(arr) {
		var i = arr.length, j, temp;
		if (i === 0) return false;
		while (--i) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[i];
			arr[i] = arr[j]; 
			arr[j] = temp;
		}
		return arr;
	}, la = (typeof labelArray == 'object' && labelArray.length > 0) ? '/-/' + shu(labelArray)[0] : "", rri = function(json) {
		var to = json.feed.openSearch$totalResults.$t - def.numPosts,
			si = ri(1, (to > 0 ? to : 1));
		lo(def.homePage.replace(/\/$/, "") + '/feeds/posts/summary' + la + '?alt=json-in-script&orderby=updated&start-index=' + si + '&max-results=' + def.numPosts + '&callback=showRelatedPost');
	}, srp = function(json) {
		var ct = document.getElementById(def.containerId),
			entry = shu(json.feed.entry),
			st = def.widgetStyle,
			sk = def.widgetTitle + '<ul class="related-post-style-' + st + '">',
			tg = def.newTabLink ? ' target="_blank"' : '',
			cl = '<span style="display:block;clear:both;"></span>',
			link, tt, title, img, summary;
		if (!ct) return;
		for (var i = 0; i < def.numPosts; i++) {
			if (i == entry.length) break;
			tt = entry[i].title.$t;
			title = (def.titleLength !== "auto" && def.titleLength < tt.length) ? tt.substring(0, def.titleLength) + '&hellip;' : tt;
			img = ("media$thumbnail" in entry[i] && def.thumbnailSize !== false) ? entry[i].media$thumbnail.url.replace(/\/s[0-9]+(\-c)?/, "/s" + def.thumbnailSize + "-c") : def.noImage;
			summary = ("summary" in entry[i] && def.summaryLength > 0) ? entry[i].summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, def.summaryLength) + '&hellip;' : "";
			for (var j = 0, jen = entry[i].link.length; j < jen; j++) {
				link = (entry[i].link[j].rel == "alternate") ? entry[i].link[j].href : "#";
			}
			if (st == 2) {
				sk += '<li><img alt="" class="related-post-item-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><a class="related-post-item-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a><span class="related-post-item-summary"><span class="related-post-item-summary-text">' + summary + '</span> <a href="' + link + '" class="related-post-item-more"' + tg + '>' + def.moreText + '</a></span>' + cl + '</li>';
			} else if (st == 3 || st == 4) {
				sk += '<li class="related-post-item" tabindex="0"><a class="related-post-item-title" href="' + link + '"' + tg + '><img alt="" class="related-post-item-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"></a><div class="related-post-item-tooltip"><a class="related-post-item-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a></div>' + cl + '</li>';
			} else if (st == 5) {
				sk += '<li class="related-post-item" tabindex="0"><a class="related-post-item-wrapper" href="' + link + '" title="' + tt + '"' + tg + '><img alt="" class="related-post-item-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><span class="related-post-item-tooltip">' + title + '</span></a>' + cl + '</li>';
			} else if (st == 6) {
				sk += '<li><a class="related-post-item-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a><div class="related-post-item-tooltip"><img alt="" class="related-post-item-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><span class="related-post-item-summary"><span class="related-post-item-summary-text">' + summary + '</span></span>' + cl + '</div></li>';
			} else {
				sk += '<li><a title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a></li>';
			}
		} ct.innerHTML = sk += '</ul>' + cl;
		def.callBack();
	};
	randomRelatedIndex = rri;
	showRelatedPost = srp;
	lo(def.homePage.replace(/\/$/, "") + '/feeds/posts/summary' + la + '?alt=json-in-script&orderby=updated&max-results=0&callback=randomRelatedIndex');
})(window, document, document.getElementsByTagName('head')[0]);