/*! Related Post Widget for Blogger by Taufik Nurrohman <https://github.com/tovic> */
(function(a, b, c) {
    var hash = (new Date()).getTime();
    // Default configuration data
    var def = {
        widgetTitle: "<h4>Artikel Terkait:</h4>",
        widgetStyle: 1,
        homePage: "http://dte-feed.blogspot.com",
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
    // Check if the base variable is exist
    if (typeof relatedPostConfig === "object") {
        // Replace the default variable with variable value of `relatedPostConfig` if any
        for (var i in relatedPostConfig) {
            def[i] = relatedPostConfig[i];
        }
    }
    // Remove trailing slash and `?m=1` or `?m=0` query string in the base URL if any
    def.homePage = def.homePage.replace(/\/?\?m=\d+(\&|$)|\/+$/, "");
    // Dynamic JavaScript loader (using `<script>` tag)
    var inject = function(url) {
        var s = b.createElement('script');
        s.src = url;
        c.appendChild(s);
    },
    // Generate random number from the range of `min` to `max`
    ri = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Function to randomize array(s)
    shuffle = function(arr) {
        var i = arr.length, j, temp;
        if (i === 0) return false;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j]; 
            arr[j] = temp;
        }
        return arr;
    },
    // Check if the base variable for the tag/label list does not exist or empty
    la = (typeof labelArray === "object" && labelArray.length) ? '/-/' + shuffle(labelArray)[0] : "",
    // A "random related index" function
    // Generate random `start-index` value by loading an empty JSON feed entry
    // to get only the `json.feed.openSearch$totalResults.$t` data to fill
    // the `max` parameter of the `ri()` function above
    do_related_post_start = function(json) {
        var to = json.feed.openSearch$totalResults.$t - def.numPosts,
            si = ri(1, (to > 0 ? to : 1)); // Get random `start-index` with the `ri()` function
        // Loading the original related post data ...
        inject(def.homePage + '/feeds/posts/summary' + la + '?alt=json-in-script&orderby=updated&start-index=' + si + '&max-results=' + def.numPosts + '&callback=do_related_post_' + hash);
    },
    // A "show related post" function
    do_related_post = function(json) {
        var ct = b.getElementById(def.containerId),
            entry = shuffle(json.feed.entry),
            st = def.widgetStyle,
            sk = def.widgetTitle + '<ul class="related-post-style-' + st + '">',
            tg = def.newTabLink ? ' target="_blank"' : '',
            cl = '<span style="display:block;clear:both;"></span>',
            link, tt, title, img, summary;
        if (!ct) return;
        var entryLength = entry.length,
            ci = 'related-post-item';
        for (var i = 0; i < def.numPosts; i++) {
            if (i === entryLength) break;
            tt = entry[i].title.$t;
            title = (def.titleLength !== 'auto' && def.titleLength < tt.length) ? tt.substring(0, def.titleLength) + '&hellip;' : tt;
            img = ("media$thumbnail" in entry[i] && def.thumbnailSize !== false) ? entry[i].media$thumbnail.url.replace(/\/s\d+(\-c)?\//, '/s' + def.thumbnailSize + '-c/') : def.noImage;
            summary = ("summary" in entry[i] && def.summaryLength > 0) ? entry[i].summary.$t.replace(/<br *\/?>/gi, ' ').replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, def.summaryLength) + '&hellip;' : "";
            for (var j = 0, jen = entry[i].link.length; j < jen; j++) {
                if (entry[i].link[j].rel == "alternate") {
                    link = entry[i].link[j].href;
                    break;
                }
            }
            if (st == 2) {
                sk += '<li><img alt="" class="' + ci + '-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><a class="' + ci + '-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a><span class="' + ci + '-summary"><span class="' + ci + '-summary-text">' + summary + '</span> <a href="' + link + '" class="' + ci + '-more"' + tg + '>' + def.moreText + '</a></span>' + cl + '</li>';
            } else if (st == 3 || st == 4) {
                sk += '<li class="' + ci + '" tabindex="0"><a class="' + ci + '-title" href="' + link + '"' + tg + '><img alt="" class="' + ci + '-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"></a><div class="' + ci + '-tooltip"><a class="' + ci + '-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a></div>' + cl + '</li>';
            } else if (st == 5) {
                sk += '<li class="' + ci + '" tabindex="0"><a class="' + ci + '-wrapper" href="' + link + '" title="' + tt + '"' + tg + '><img alt="" class="' + ci + '-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><span class="' + ci + '-tooltip">' + title + '</span></a>' + cl + '</li>';
            } else if (st == 6) {
                sk += '<li><a class="' + ci + '-title" title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a><div class="' + ci + '-tooltip"><img alt="" class="' + ci + '-thumbnail" src="' + img + '" width="' + def.thumbnailSize + '" height="' + def.thumbnailSize + '"><span class="' + ci + '-summary"><span class="' + ci + '-summary-text">' + summary + '</span></span>' + cl + '</div></li>';
            } else {
                sk += '<li><a title="' + tt + '" href="' + link + '"' + tg + '>' + title + '</a></li>';
            }
        } ct.innerHTML = sk += '</ul>' + cl;
        def.callBack(json);
    };
    a['do_related_post_' + hash] = do_related_post;
    a['do_related_post_start_' + hash] = do_related_post_start;
    // Generate random `start-index` data before loading the original related post data ...
    inject(def.homePage + '/feeds/posts/summary?alt=json-in-script&orderby=updated&max-results=0&callback=do_related_post_start_' + hash);
})(window, document, document.getElementsByTagName('head')[0]);