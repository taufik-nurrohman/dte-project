/*!
 * Simple regex experiment to create an automatic emoticons by Taufik Nurrohman
 * Visit: http://www.dte.web.id
 * Update: 23 August 2012
 */

(function($) {
	$(document).ready(function() {

		// Append an emoticon bar before comment-form
		if (putEmoAbove) {
			$(putEmoAbove).before('<div class="emoWrap"> :) :( =( :waaa: :s ^_^ :D =D ^:D @@, ;) :-bd :-d :yaya: :&#39;( T_T :&#92; :p B) :Q :Ozz 7:( &#92;o/ &#92;m/ **p &lt;3 0:) ^o^ :-a 7:O *fck* xV x@ X@ ~x( &lt;:) &lt;=) (-.-,) *=p =p* &#39;&#39;J :W :bye: :imhere: :cendol: :rolled: *bang* :drummer: :guitarist: :vocalist:</div>');
		}
		function emo(emo, imgRep, emoKey) {
			$(emoRange).html(function() {
				return $(this).html().replace(/<br ?\/?>(:|;|=|\^)/ig, "<br> $1").replace(emo, " <img src='" + imgRep + "' class='emo delayLoad' alt='" + emoKey + "' />");
			});
		}
		emo(/\s:\)+/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/01.gif", ":)");
		emo(/\s;\)+/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/02.gif", ";)");
		emo(/\s:\(/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/03.gif", ":(");
		emo(/\s=\(/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/04.gif", "=(");
		emo(/\s@@,/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/05.gif", "@@,");
		emo(/\s:yaya:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/06.gif", ":yaya:");
		emo(/\s:s/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/07.gif", ":s");
		emo(/\s:\\/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/08.gif", ":&#92;");
		emo(/\s:D/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/09.gif", ":D");
		emo(/\s=D/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/10.gif", "=D");
		emo(/\s\^:D/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/11.gif", "^:D");
		emo(/\s\^(\_|)\^/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/12.gif", "^_^");
		emo(/\s:'\(/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/13.gif", ":&#39;(");
		emo(/\s:waaa:/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/14.gif", ":waaa:");
		emo(/\sT_T/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/15.gif", "T_T");
		emo(/\sB\)/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/16.gif", "B)");
		emo(/\s:Q/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/17.gif", ":Q");
		emo(/\s\*\*p/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/18.gif", "**p");
		emo(/\s7:\(/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/19.gif", "7:(");
		emo(/\s:p/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/20.gif", ":p");
		emo(/\s:Oz+/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/21.gif", ":Ozz");
		emo(/\s7:O/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/22.gif", "7:O");
		emo(/\s\\o\//ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/23.gif", "&#92;o/");
		emo(/\s\\m\//ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/24.gif", "&#92;m/");
		emo(/\s&lt;3/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/25.gif", "&amp;amp;lt;3");
		emo(/\s0:\)+/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/26.gif", "0:)");
		emo(/\s\^o\^/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/27.gif", "^o^");
		emo(/\s:-a/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/28.gif", ":-a");
		emo(/\s\*fck\*/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/29.gif", "*fck*");
		emo(/\sxV/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/30.gif", "xV");
		emo(/\sx\@/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/31.gif", "x@");
		emo(/\s\X\@/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/32.gif", "X@");
		emo(/\s:-d/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/33.gif", ":-d");
		emo(/\s:-bd/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/34.gif", ":-bd");
		emo(/\s\~x\(+/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/35.gif", "~x(");
		emo(/\s:bye:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/36.gif", ":bye:");
		emo(/\s:W/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/37.gif", ":W");
		emo(/\s\(-\.-,\)/g, "http://dte-project.googlecode.com/svn/trunk/emoticon/38.gif", "(-.-,)");
		emo(/\s\*=p/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/39.gif", "*=p");
		emo(/\s=p\*/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/40.gif", "=p*");
		emo(/\s:imhere:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/41.gif", ":imhere:");
		emo(/\s:cendol:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/42.gif", ":cendol:");
		emo(/\s&lt;:\)/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/43.gif", "&amp;amp;lt;:)");
		emo(/\s&lt;=\)/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/44.gif", "&amp;amp;lt;=)");
		emo(/\s:rolled:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/45.gif", ":rolled:");
		emo(/\s\*bang\*/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/46.gif", "*bang*");
		emo(/\s\'\'J/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/47.gif", "&#39;&#39;J");
		emo(/\s:drummer:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/48.gif", ":drummer:");
		emo(/\s:guitarist:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/49.gif", ":guitarist:");
		emo(/\s:vocalist:/ig, "http://dte-project.googlecode.com/svn/trunk/emoticon/50.gif", ":vocalist:");

		var one = 0; // Show alert once!

		// Click anywhere to hide the emoticon
		$(document.body).on("click", function() {
			$('.emoKey').remove();
		});

		// Click to show the code!
		$('.emo').css('cursor', 'pointer').on("click", function(e) {
			$('.emoKey').remove();
			$(this).after('<input class="emoKey" type="text" size="6" value=" ' + this.alt + '" />');
			$('.emoKey').trigger("select");
			if(emoMessage && one === 0) {
				alert(emoMessage);
				one = 1;
			}
			e.stopPropagation();
		});

	});
})(jQuery);