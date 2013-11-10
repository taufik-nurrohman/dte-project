/**
 * Blogger Tabbed Style Table of Content Widget by Taufik Nurrohman
 * Free for change but keep the original attribution.
 * URL: https://plus.google.com/108949996304093815163/about
 * TEMPLATES: &lt;div id="tabbed-toc"&gt;&lt;span class="loading"&gt;Loading...&lt;/span&gt;&lt;/div&gt;&lt;script type="text/javascript"&gt;var tabbedTOC = {blogUrl:"http://latitudu.blogspot.com", containerId: "tabbed-toc", activeTab: 1};&lt;/script&gt;&lt;script type="text/javascript" src="js/tabbed-toc.js"&gt;&lt;/script&gt;
 */

var tabbedTOC_defaults = {
	blogUrl: "http://www.dte.web.id", // Blog URL
	containerId: "tabbed-toc", // Container ID
	activeTab: 1, // The default active tab index (default: the first tab)
	showDates: false, // true to show the post date
	showSummaries: false, // true to show the posts summaries
	numChars: 200, // Number of summary chars
	showThumbnails: false, // true to show the posts thumbnails (Not recommended)
	thumbSize: 40, // Thumbnail size
	noThumb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC", // No thumbnail URL
	monthNames: [ // Array of month names
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
	newTabLink: true, // Open link in new window?
	maxResults: 99999, // Maximum posts result
	preload: 0, // Load the feed after 0 seconds (option => time in milliseconds || "onload")
	sortAlphabetically: true, // `false` to sort posts by date
	showNew: false, // `false` to hide the "New!" mark in most recent posts, or define how many recent posts are to be marked
	newText: " - <em style='color:red;'>Baru!</em>" // HTML for the "New!" text
};

for (var i in tabbedTOC_defaults) {
	tabbedTOC_defaults[i] = (typeof(tabbedTOC[i]) !== undefined && typeof(tabbedTOC[i]) !== 'undefined') ? tabbedTOC[i] : tabbedTOC_defaults[i];
}

function clickTab(pos) {
	var a = document.getElementById(tabbedTOC_defaults.containerId),
		b = a.getElementsByTagName('ol'),
		c = a.getElementsByTagName('ul')[0],
		d = c.getElementsByTagName('a');
	for (var t = 0; t < b.length; t++) {
		b[t].style.display = "none";
		b[parseInt(pos, 10)].style.display = "block";
	}
	for (var u = 0; u < d.length; u++) {
		d[u].className = "";
		d[parseInt(pos, 10)].className = "active-tab";
	}
}

function showTabs(json) {

	var total = parseInt(json.feed.openSearch$totalResults.$t,10),
		c = tabbedTOC_defaults,
		entry = json.feed.entry,
		category = json.feed.category,
		skeleton = "",
		newPosts = [];

	for (var g = 0; g < (c.showNew === true ? 5 : c.showNew); g++) {
		if (g == entry.length) break;
		entry[g].title.$t = entry[g].title.$t + (c.showNew !== false ? c.newText : '');
	}

	entry = c.sortAlphabetically ? entry.sort(function(a,b) {
		return (a.title.$t.localeCompare(b.title.$t));
	}) : entry;
	category = c.sortAlphabetically ? category.sort(function(a,b) {
		return (a.term.localeCompare(b.term));
	}) : category;

	// Build the tabs skeleton
	skeleton = '<span class="divider-layer"></span><ul class="toc-tabs">';
	for (var h = 0, cen = category.length; h < cen; h++) {
		skeleton += '<li class="toc-tab-item-' + h + '"><a href="javascript:clickTab(' + h + ');">' + category[h].term + '</a></li>';
	}
	skeleton += '</ul>';

	// Bulid the tabs contents skeleton
	skeleton += '<div class="toc-content">';
	for (var i = 0, cnt = category.length; i < cnt; i++) {
		skeleton += '<ol class="panel" data-category="' + category[i].term + '"';
		skeleton += (i != (c.activeTab-1)) ? ' style="display:none;"' : '';
		skeleton += '>';
		for (var j = 0; j < total; j++) {
			if (j == entry.length) break;
			var link, entries = entry[j],
				pub = entries.published.$t, // Get the post date
				month = c.monthNames, // Month array from the configuration
				title = entries.title.$t, // Get the post title
				summary = ("summary" in entries && c.showSummaries === true) ? entries.summary.$t.replace(/<br ?\/?>/g," ").replace(/<.*?>/g,"").replace(/[<>]/g,"").substring(0,c.numChars) + '&hellip;' : '', // Get the post summary
				img = ("media$thumbnail" in entries && c.showThumbnails === true) ? '<img class="thumbnail" style="width:'+c.thumbSize+'px;height:'+c.thumbSize+'px;" alt="" src="' + entries.media$thumbnail.url.replace(/\/s72(\-c)?\//,"/s"+c.thumbSize+"-c/") + '"/>' : '<img class="thumbnail" style="width:'+c.thumbSize+'px;height:'+c.thumbSize+'px;" alt="" src="' + c.noThumb.replace(/\/s72(\-c)?\//,"/s"+c.thumbSize+"-c/") + '"/>', // Get the post thumbnail
				cat = (entries.category) ? entries.category : [], // Post categories
				date = (c.showDates) ? '<time datetime="' + pub + '" title="' + pub + '">' + pub.substring(8,10) + ' ' + month[parseInt(pub.substring(5,7),10)-1] + ' ' + pub.substring(0,4) + '</time>' : ''; // Formated published date
				
			for (var k = 0; k < entries.link.length; k++) {
				if (entries.link[k].rel == 'alternate') {
					link = entries.link[k].href; // Get the post URL
					break;
				}
			}
			for (var l = 0, check = cat.length; l < check; l++) {
				var target = (c.newTabLink) ? ' target="_blank"' : ''; // Open link in new window?
				// Write the list skeleton only if at least one of the post...
				// ... has the same category term with one of the current categories term list
				if (cat[l].term == category[i].term) {
					skeleton += '<li title="' + cat[l].term + '"';
					skeleton += (c.showSummaries) ? ' class="bold"' : '';
					skeleton += '><a href="' + link + '"' + target + '>' + title + date + '</a>';
					skeleton += (c.showSummaries) ? '<span class="summary">' + img + summary + '<span style="display:block;clear:both;"></span></span>' : '';
					skeleton += '</li>';
				}
			}
		}
		skeleton += '</ol>';
	}

	skeleton += '</div>';
	skeleton += '<div style="clear:both;"></div>';
	document.getElementById(c.containerId).innerHTML = skeleton;
	clickTab(c.activeTab-1);

}

(function() {
	var h = document.getElementsByTagName('head')[0],
		s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = tabbedTOC_defaults.blogUrl + '/feeds/posts/summary?alt=json-in-script&max-results=' + tabbedTOC_defaults.maxResults + '&orderby=published&callback=showTabs';
	if (tabbedTOC_defaults.preload !== "onload") {
		setTimeout(function() {
			h.appendChild(s);
		}, tabbedTOC_defaults.preload);
	} else {
		window.onload = function() {
			h.appendChild(s);
		};
	}
})();