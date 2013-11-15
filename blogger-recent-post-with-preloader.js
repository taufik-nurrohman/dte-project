// Recent Post widget for Blogger with Preloader
// Author: Taufik Nurrohman
// https://plus.google.com/108949996304093815163/about

function showRecentPosts(json) {

    for (var i = 0; i < rp_numPosts; i++) {
        if (i == json.feed.entry.length) break;
        var entry = json.feed.entry[i],
            postTitle = entry.title.$t,
            postAuthor = entry.author[0].name.$t,
            postDate = entry.published.$t.substring(0, 10),
            postUrl,
            linkTarget,
            postContent,
            postImage,
            skeleton = "";

        var dy = postDate.substring(0, 4),
            dm = postDate.substring(5, 7),
            dd = postDate.substring(8, 10);

        for (var j = 0; j < entry.link.length; j++) {
            if (entry.link[j].rel == 'alternate') {
                postUrl = entry.link[j].href;
                break;
            }
        }

        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                commentNum = entry.link[k].title.split(" ")[0];
                commentLabel = entry.link[k].title.split(" ")[1];
                break;
            }
        }

        if ("content" in entry) {
            postContent = entry.content.$t;
        } else if ("summary" in entry) {
            postContent = entry.summary.$t;
        } else {
            postContent = '';
        }

        if (rp_thumbWidth !== 0 || rp_thumbWidth !== false) {
            if ("media$thumbnail" in entry) {
                postImage = '<img style="width:' + rp_thumbWidth + 'px;height:' + rp_thumbWidth + 'px;" src="' + entry.media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "\/s" + rp_thumbWidth + "-c") + '" alt="Loading..." />';
            } else {
                postImage = '<img style="width:' + rp_thumbWidth + 'px;height:' + rp_thumbWidth + 'px;" src="' + rp_noImage + '" alt="Loading..."/>';
            }
        } else {
            postImage = "";
        }

        postContent = postContent.replace(/<br ?\/?>/ig, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "");

        if (postContent.length > rp_numChars || rp_numChars !== false) {
            if (rp_numChars !== 0) {
                postContent = postContent.substring(0, rp_numChars) + '&hellip;';
            } else {
                postContent = '';
            }
        } else {
            postContent = '';
        }

        linkTarget = (rp_newTabLink) ? ' target="_blank"' : '';

        skeleton = '<li>';
        skeleton += '<a href="' + postUrl + '"' + linkTarget + '>' + postImage + '</a>';
        skeleton += '<a class="title" href="' + postUrl + '"' + linkTarget + '>' + postTitle + '</a>';
        skeleton += postContent;
        skeleton += '<br style="clear:both;"/><span class="foot"><span class="dt">' + dd + ' ' + rp_monthNames[parseInt(dm, 10) - 1] + ' ' + dy + '</span> <span class="cm">(' + commentNum + ' ' + commentLabel + ')</span></span>';
        skeleton += '</li>';
        document.getElementById('dte_recent-post').innerHTML += skeleton;
    }

}

var labelName = (rp_sortByLabel !== false) ? '-/' + rp_sortByLabel : "";
var rp_script = document.createElement('script');
rp_script.src = rp_homePage + '/feeds/posts/summary/' + labelName + '?alt=json-in-script&callback=showRecentPosts';

// Preloading...
if (rp_loadTimer === "onload") {
    window.onload = function() {
        document.getElementsByTagName('head')[0].appendChild(rp_script);
    };
} else {
    setTimeout(function() {
        document.getElementsByTagName('head')[0].appendChild(rp_script);
    }, rp_loadTimer);
}