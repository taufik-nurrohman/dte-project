// var numpost = 7,
//     numcomment = 7,
//     cmtext = "Komentar",
//     cmsumm = 100,
//     pblank = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC";

// RECENT POSTS & RECENT COMMENTS 4 DROP DOWN MENU
// http://gplus.to/tovic

// Recent Post with Thumbnail
function dropdownposts(json) {
    var entry = json.feed.entry, posturl, postimg;
    for (var i = 0; i < numpost; i++) {
        for (var j = 0; j < entry[i].link.length; j++) {
            if (entry[i].link[j].rel == 'alternate') {
                posturl = entry[i].link[j].href;
                break;
            }
        }
        for (var l = 0; l < entry[i].link.length; l++) {
            if (entry[i].link[l].rel == "replies" && entry[i].link[l].type == "text/html") {
                cmnum = entry[i].link[l].title.split(" ")[0];
                break;
            }
        }
        var poststitle = entry[i].title.$t,
            postdate = entry[i].published.$t.substring(0, 10);
        postdate = postdate.replace(/\-/g, "/");
        postimg = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url : pblank;
        document.write('<li><img src="' + postimg + '" class="rp-thumb" alt="thumb" /><strong><a href="' + posturl + '">' + poststitle + '</a></strong><span class="footer-outer"><span class="dt">' + postdate + '</span><span class="cm"> - ' + cmnum + ' ' + cmtext + '</span></span></li>');
    }
}

// Recent Comment
function dropdowncomments(json) {
    var entry, commurl, commsum;
    for (var i = 0; i < numcomment; i++) {
        entry = json.feed.entry[i];
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                commurl = entry.link[k].href;
                break;
            }
        }
        commsum = ("content" in entry) ? entry.content.$t : ("summary" in entry) ? entry.summary.$t : "";
        commsum = commsum.replace(/<.*?>/g, "");
        if (commsum.length > cmsumm) commsum = commsum.substring(0, cmsumm) + "...";
        document.write('<li><strong><a rel="nofollow" href="' + commurl + '">' + entry.author[0].name.$t + ':</a></strong> <span>' + commsum + '</span></li>');
    }
}