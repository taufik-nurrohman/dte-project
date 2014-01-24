// Original: http://www.threelas.com
// Modified by Taufik Nurrohman (http://www.dte.web.id)

function toc_sort_table(a) {
	var post = [], label = [], timepub = [], b = a.feed.openSearch$totalResults.$t;
	if (b < theTotalPosts) theTotalPosts = b - 1;
	for (var c = 0; c <= theTotalPosts; c++) {
		post[c] = a.feed.entry[c].title.$t;
		label[c] = a.feed.entry[c].category[0].term;
		timepub[c] = a.feed.entry[c].published.$t.substring(0, 10);
	}
	var d = [];
	for (var c = 0; c <= theTotalPosts; c++) {
		for (var e = 0; e <= a.feed.entry[c].link.length - 1; e++) {
			if (a.feed.entry[c].link[e].rel == "alternate") {
				d[c] = a.feed.entry[c].link[e].href;
				break;
			}
		}
	}
	document.write('<select id="tocSort" onchange="displayMessage(this.options[this.selectedIndex].value);"><option value="0">' + theOptions + '</option><option value="0">' + theSortPosts + '</option><option value="1">' + theSortLabels + '</option></select>');
	document.write('<table border="1" id="tocTable"><thead><tr><th id="th-1">' + theTitles + '</th><th id="th-2">' + theLabels + '<th id="th-3">' + theDates + '</th>');
	document.write('</tr></thead>');
	document.write('<tbody id="toc-903298438493857447454">'); // Unique ID doh...
	for (var c = 0; c <= theTotalPosts; c++) {
		if (a.feed.entry[c].category.length >= 1) {
			for (var e = 0; e <= a.feed.entry[c].category.length - 1; e++) {
				document.write('<tr>');
				document.write('<td class="toc-header-col-1">' + '<a href="' + d[c] + '" target="_blank">' + post[c] + "</a>" + '</td>');
				document.write('<td class="toc-header-col-2">' + '<a href="' + theSiteUrl + "/search/label/" + a.feed.entry[c].category[e].term + '" target="_blank">' + a.feed.entry[c].category[e].term + "</a>" + '</td>');
				document.write('<td class="toc-header-col-3">' + timepub[c] + '</td>');
				document.write('</tr>');
			}
		} else {
			document.write('<tr>');
			document.write('<td class="toc-header-col-1">' + '<a href="' + d + '" target="_blank">' + post[c] + "</a>" + '</td>');
			document.write('<td class="toc-header-col-2">' + theBlankLabels + '</td>');
			document.write('<td class="toc-header-col-3">' + timepub[c] + '</td>');
			document.write('</tr>');
		}
	}
	document.write('</tbody>');
	document.write('</table><div style="text-align:right;"><a href="http://www.dte.web.id" target="_blank" style="font:normal bold 8px/normal Arial,Sans-Serif;color:#666;text-shadow:0 1px 0 rgba(255,255,255,.2);" title="Taufik Nurrohman">DTE :]</a></div>');
}

function getTextValue(a) {
	var b, c = "";
	for (b = 0; b < a.childNodes.length; b++) {
		if (a.childNodes[b].nodeType == document.TEXT_NODE) {
			c += a.childNodes[b].nodeValue;
		} else if (a.childNodes[b].nodeType == document.ELEMENT_NODE && a.childNodes[b].tagName == "BR") {
			c += " ";
		} else {
			c += getTextValue(a.childNodes[b]);
		}
	}
	return normalizeString(c);
}

function normalizeString(a) {
	var whtSpEnds = new RegExp("^\\s*|\\s*$", "g"),
		whtSpMult = new RegExp("\\s\\s+", "g");
	a = a.replace(whtSpMult, " ").replace(whtSpEnds, "");
	return a;
}

function compareValues(a, b) {
	var c = parseFloat(a), d = parseFloat(b);
	if (!isNaN(c) && !isNaN(d)) {
		a = c;
		b = d;
	}
	if (a == b) return 0;
	if (a > b) return 1;
	return -1;
}

function displayMessage(a) {
	var b = document.getElementById("toc-903298438493857447454");
	if (b.reverseSort == null) b.reverseSort = [];
	if (a == b.lastColumn) b.reverseSort[a] = !b.reverseSort[a];
	b.lastColumn = a;
	var c = b.style.display;
	b.style.display = "none";
	var d, e, f, g, h, i, j;
	for (e = 0; e < b.rows.length - 1; e++) {
		h = e;
		g = getTextValue(b.rows[e].cells[a]);
		for (f = e + 1; f < b.rows.length; f++) {
			i = getTextValue(b.rows[f].cells[a]);
			j = compareValues(g, i);
			if (b.reverseSort[a]) j = -j;
			if (j > 0) {
				h = f;
				g = i;
			}
		}
		if (h > e) {
			d = b.removeChild(b.rows[h]);
			b.insertBefore(d, b.rows[e]);
		}
	}
	b.style.display = c;
	return false;
}

if (document.ELEMENT_NODE == null) {
	document.ELEMENT_NODE = 1;
	document.TEXT_NODE = 3;
}

document.write('<scr' + 'ipt src="' + theSiteUrl.replace(/\/$/, "") + '/feeds/posts/summary?max-results=' + theTotalPosts + '&alt=json-in-script&orderby=published&callback=toc_sort_table"><\/scr' + 'ipt>');