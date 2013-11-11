// Recent Comment Script for Blogger with Auto Refresh & Notification by Taufik Nurrohman
// URL: https://plus.google.com/108949996304093815163/about

var cm_config_defaults = {
	home_page: "http://www.dte.web.id",
	max_result: 7,
	t_w: 32,
	t_h: 32,
	summary: 9999,
	new_tab_link: true,
	ct_id: "comments-container",
	new_cm: " Komentar Baru!",
	interval: 30000,
	alert: true
}, _cookie = {
	set: function (g, f, j) {
		var i, h;
		if (j) {
			i = new Date();
			i.setTime(i.getTime() + (j * 24 * 60 * 60 * 1000));
			h = "; expires=" + i.toGMTString();
		} else {
			h = "";
		}
		document.cookie = g + "=" + f + h + "; path=/";
	}, get: function (f) {
		var e = f + "=",
			h = document.cookie.split(";"),
			j;
		for (var g = 0; g < h.length; g++) {
			j = h[g];
			while (j.charAt(0) == " ") {
				j = j.substring(1, j.length);
			}
			if (j.indexOf(e) == 0) {
				return j.substring(e.length, j.length);
			}
		}
		return null;
	}, del: function (b) {
		this.set(b, "", - 1);
	}
}, tt_cm = (_cookie.get('tt_cm')) ? _cookie.get('tt_cm') : 0, doc_title = document.title;

for (var i in cm_config_defaults) {
	cm_config_defaults[i] = (typeof (cm_config[i]) == 'undefined') ? cm_config_defaults[i] : cm_config[i];
}

function showRecentComments(json) {

	var entry = json.feed.entry,
		total = parseInt(json.feed.openSearch$totalResults.$t, 10), // Get the comments total
		skeleton = "",
		oldCount = tt_cm, // Get the older comments total
		co = cm_config_defaults;

	// Compare the older comments total with the new comments total.
	// If it's greater, then => show the warning of `the new comments total` minus `the older comments total`
	if (oldCount < total) {
		if (co.alert === true) {
			alert((total - oldCount) + co.new_cm);
		} else if (co.alert === false) {
			document.title = '(' + (total - oldCount) + co.new_cm + ') ' + doc_title;
		} else {
			co.alert((total - oldCount), co.new_cm);
		}
	}

	// Just a recent comments widget
	skeleton = '<ul class="cm-outer">';
	for (var i = 0; i < entry.length; i++) {
		for (var j = 0; j < entry[i].link.length; j++) {
			if (entry[i].link[j].rel == 'alternate') {
				link = entry[i].link[j].href;
				break;
			}
		}
		var dash = link.lastIndexOf('/') + 1,
			dot = link.lastIndexOf('.'),
			title = link.split('-').join(" ").substring(dash, dot) + '&hellip;';
		author = entry[i].author[0],
		name = author.name.$t,
		avatar = author.gd$image.src.replace(/\/s[0-9]+(\-c|\/)/, "/s" + co.t_w + "$1").replace(/http\:\/\/www.google.com\/url\?source\=imglanding(.*?)q\=/i, "").replace(/\.(jpg|jpeg|png|bmp|gif)(.*?)$/i, ".$1"),
		profile = (author.uri) ? author.uri.$t : "#nope",
		date = entry[i].gd$extendedProperty[1].value,
		content = ("content" in entry[i]) ? entry[i].content.$t.replace(/<br ?\/?>/ig, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "") : "",
		nt = (co.new_tab_link) ? ' target="_blank"' : '';
		content = (content.length > co.summary) ? content.substring(0, co.summary) + '&hellip;' : content;
		skeleton += '<li>';
		skeleton += '<div class="cm-header"><strong><a href="' + link + '" title="' + title + '"' + nt + '>' + name + '</a>, ' + date + '</strong></div>';
		skeleton += '<div class="cm-content"><a href="' + profile + '" title="' + name + '"' + nt + '><img alt="Loading..." style="width:' + co.t_w + 'px;height:' + co.t_h + 'px;" src="' + avatar + '"></a>';
		skeleton += '<span class="cm-text">' + content + '</span>';
		skeleton += '</div></li>';
	}
	skeleton += '</ul>';
	document.getElementById(co.ct_id).innerHTML = skeleton;
	_cookie.set('tt_cm', total, 7000);
	tt_cm = total;
	// console.log(tt_cm);
}

(function () {
	var head = document.getElementsByTagName('head')[0],
		script = document.createElement('script'),
		co = cm_config_defaults;
	script.type = "text/javascript";
	script.id = "cm-feed-script";
	script.src = co.home_page + "/feeds/comments/default?alt=json-in-script&redirect=false&max-results=" + co.max_result + "&callback=showRecentComments";
	head.appendChild(script);
	setInterval(function () {
		var newScript = document.createElement('script');
		newScript.type = "text/javascript";
		newScript.id = "cm-feed-script";
		newScript.src = co.home_page + "/feeds/comments/default?alt=json-in-script&redirect=false&max-results=" + co.max_result + "&callback=showRecentComments";
		var oldScript = document.getElementById('cm-feed-script');
		oldScript.parentNode.removeChild(oldScript);
		head.appendChild(newScript);
	}, co.interval);
})();
