// Recent Post Mini Thumbnail with Tooltip by Taufik Nurrohman
// http://gplus.to/tovic
// Have fun modifying this widget but make sure to keep the original attribution stay here :)

/*
var widgetTitle = "Artikel Terbaru", // Tentukan judul widget
	numPosts = 20, // Tentukan jumlah thumbnail/posting
	numChars = 300, // Tentukan jumlah karakter pada deskripsi tooltip
	tooltipFadeSpeed = 200, // Tentukan kecepatan efek .fadeIn() saat tooltip tampil
	pictureBlank = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC", // Thumbnail cadangan jika posting yang tampil tidak memiliki gambar
	blogUrl = "http://dte-feed.blogspot.com"; // Alamat blogmu
*/

// Recent Post Mini Thumbnail with Tooltip by Taufik Nurrohman
// http://gplus.to/tovic
// Have fun modifying this widget but make sure to keep the original attribution stay here :)

function setrecentposts_animation() {
	$('div.rp-item img').hide();
	$('div.rp-child').removeClass('hidden');

	var winWidth	= $(window).width(),
		winHeight   = $(window).height(),
		ttWidth	 = $('div.rp-child').outerWidth(),
		ttHeight	= $('div.rp-child').outerHeight(),
		thumbWidth  = $('div.rp-item').outerWidth(),
		thumbHeight = $('div.rp-item').outerHeight();

	$(window).resize(function() {
		winWidth = $(this).width();
		winHeight = $(this).height();
	});

	$('div.rp-item').css('position', 'static').mouseenter(function() {
		$('div.rp-child', this).filter(':not(:animated)').fadeIn(tooltipFadeSpeed);
	}).mousemove(function(e) {	
		var top = e.pageY+20, left = e.pageX+20;
		if (top + ttHeight > winHeight) {
			top = winHeight - ttHeight - 40;
		}			
		if (left + ttWidth > winWidth) {
			left = winWidth - ttWidth - 40;
		}
		$('div.rp-child', this).css({top:top,left:left});
	}).mouseleave(function() {
		$('div.rp-child', this).hide();
	});
}

function showrecentposts_thumb(json) {
	var entry = json.feed.entry, posturl, posttitle, postcontent, postimg;
	for (var i = 0; i < numPosts; i++) {
		for (var j=0; j < entry[i].link.length; j++) {
			if (entry[i].link[j].rel == 'alternate') {
				posturl = entry[i].link[j].href;
				break;
			}
		}
		postcontent = ("content" in entry[i]) ? entry[i].content.$t : ("summary" in entry[i]) ? entry[i].summary.$t : "";
		postcontent = postcontent.replace(/<.*?>/g, "").replace(/[<>]/g, "");
		if (postcontent.length > numChars) postcontent = postcontent.substring(0, numChars) + '...';
		posttitle = entry[i].title.$t;
		postimg = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url : pictureBlank;
		document.write('<div class="rp-item"><a href="' + posturl + '"><img src="' + postimg + '" alt="thumb"></a><div class="rp-child hidden"><h4><a href="' + posturl + '" style="color:inherit;text-decoration:none;">' + posttitle + '</a></h4>' + postcontent + '</div></div>');
	}
	setrecentposts_animation();
}

document.write('<div id="mini-gallery"><h2>' + widgetTitle + '</h2><sc' + 'ript src="' + blogUrl + '/feeds/posts/summary?max-results=' + numPosts + '&orderby=published&alt=json-in-script&callback=showrecentposts_thumb"></sc' + 'ript><div style="clear:both;"></div></div>');

$(window).load(function() {
	$('.rp-item img').each(function(i) {
		var $this = $(this);
		setTimeout(function() {
			$this.fadeIn(200);
		}, 100*(i+1));
	});
});