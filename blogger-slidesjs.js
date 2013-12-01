/*
var slidesJS_config = {
	url: 'http://dte-feed.blogspot.com',
	numPost: 7,
	labelName: null,
	monthArray: [
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
	noImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC',
	newTabLink: false,
	containerId: 'slidesJS',
	slider: {
		width: 570,
		height: 270,
		preload: true,
		preloadImage: "http://lh3.googleusercontent.com/-SrchH_T_dag/UpnwHVaUkCI/AAAAAAAAIY4/kAG7IM7kMT8/s1600/slidesJS-loading.gif",
		generateNextPrev: true,
		nextText: "Berikutnya",
		prevText: "Sebelumnya",
		pagination: true,
		generatePagination: true,
		prependPagination: false,
		fadeSpeed: 350,
		fadeEasing: "",
		slideSpeed: 350,
		slideEasing: "",
		start: 1,
		effect: "slide",
		crossfade: false,
		randomize: false,
		play: 5000,
		pause: 0,
		hoverPause: true,
		bigTarget: false,
		animationStart: function(current) {
			$('.slidesJS-caption', '.' + this.container).slideUp(100);
		},
		animationComplete: function(current) {
			$('.slidesJS-caption', '.' + this.container).slideDown(200);
		},
		slidesLoaded: function() {
			$('.slidesJS-caption', '.' + this.container).slideDown(200);
		}
	}
};
*/

/*!
 * Slides, A Slideshow Plugin for jQuery
 * Intructions: http://slidesjs.com
 * By: Nathan Searles, http://nathansearles.com
 * Version: 1.2.0
 * Updated: February 5th, 2013
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modified by Taufik Nurrohman <http://gplus.to/tovic>
 */
(function(a){a.fn.slides=function(b){return b=a.extend({},a.fn.slides.option,b),this.each(function(){function w(g,h,i){if(!p&&o){switch(p=!0,b.animationStart(n+1),g){case"next":l=n,k=n+1,k=e===k?0:k,r=2*f,g=2*-f,n=k;break;case"prev":l=n,k=n-1,k=-1===k?e-1:k,r=0,g=0,n=k;break;case"pagination":k=parseInt(i,10),l=a("."+b.paginationClass+" li."+b.currentClass+" a",c).attr("href").match("[^#/]+$"),k>l?(r=2*f,g=2*-f):(r=0,g=0),n=k}"fade"===h?b.crossfade?d.children(":eq("+k+")",c).css({zIndex:10}).fadeIn(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1)}):d.children(":eq("+l+")",c).fadeOut(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing)}):d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing,function(){}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+k+")").css({left:r,display:"block"}),b.autoHeight?d.animate({left:g,height:d.children(":eq("+k+")").outerHeight()},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1}):d.animate({left:g},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1})),b.pagination&&(a("."+b.paginationClass+" li."+b.currentClass,c).removeClass(b.currentClass),a("."+b.paginationClass+" li:eq("+k+")",c).addClass(b.currentClass))}}function x(){clearInterval(c.data("interval"))}function y(){b.pause?(clearTimeout(c.data("pause")),clearInterval(c.data("interval")),u=setTimeout(function(){clearTimeout(c.data("pause")),v=setInterval(function(){w("next",i)},b.play),c.data("interval",v)},b.pause),c.data("pause",u)):x()}a("."+b.container,a(this)).children().wrapAll('<div class="slides_control"/>');var o,p,q,r,t,u,v,c=a(this),d=a(".slides_control",c),e=d.children().size(),f=d.children().outerWidth(),g=d.children().outerHeight(),h=b.start-1,i=0>b.effect.indexOf(",")?b.effect:b.effect.replace(" ","").split(",")[0],j=0>b.effect.indexOf(",")?i:b.effect.replace(" ","").split(",")[1],k=0,l=0,m=0,n=0;if(2>e)return a("."+b.container,a(this)).fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()}),a("."+b.next+", ."+b.prev).fadeOut(0),!1;if(!(2>e)){if(0>h&&(h=0),h>e&&(h=e-1),b.start&&(n=h),b.randomize&&d.randomize(),a("."+b.container,c).css({overflow:"hidden",position:"relative"}),d.children().css({position:"absolute",top:0,left:d.children().outerWidth(),zIndex:0,display:"none"}),d.css({position:"relative",width:3*f,height:g,left:-f}),a("."+b.container,c).css({display:"block"}),b.autoHeight&&(d.children().css({height:"auto"}),d.animate({height:d.children(":eq("+h+")").outerHeight()},b.autoHeightSpeed)),b.preload&&d.find("img:eq("+h+")").length){a("."+b.container,c).css({background:"url("+b.preloadImage+") no-repeat 50% 50%"});var z=d.find("img:eq("+h+")").attr("src")+"?"+(new Date).getTime();t="slides_control"!=a("img",c).parent().attr("class")?d.children(":eq(0)")[0].tagName.toLowerCase():d.find("img:eq("+h+")"),d.find("img:eq("+h+")").attr("src",z).load(function(){d.find(t+":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){a(this).css({zIndex:5}),a("."+b.container,c).css({background:""}),o=!0,b.slidesLoaded()})})}else d.children(":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()});b.bigTarget&&(d.children().css({cursor:"pointer"}),d.children().on("click",function(){return w("next",i),!1})),b.hoverPause&&b.play&&(d.bind("mouseover",function(){x()}),d.bind("mouseleave",function(){y()})),b.generateNextPrev&&(a("."+b.container,c).after('<a href="#prev" class="'+b.prev+'">'+b.prevText+'</a>'),a("."+b.prev,c).after('<a href="#next" class="'+b.next+'">'+b.nextText+'</a>')),a("."+b.next,c).on("click",function(a){a.preventDefault(),b.play&&y(),w("next",i)}),a("."+b.prev,c).on("click",function(a){a.preventDefault(),b.play&&y(),w("prev",i)}),b.generatePagination?(b.prependPagination?c.prepend("<ul class="+b.paginationClass+"></ul>"):c.append("<ul class="+b.paginationClass+"></ul>"),d.children().each(function(){a("."+b.paginationClass,c).append('<li><a href="#'+m+'">'+(m+1)+"</a></li>"),m++})):a("."+b.paginationClass+" li a",c).each(function(){a(this).attr("href","#"+m),m++}),a("."+b.paginationClass+" li:eq("+h+")",c).addClass(b.currentClass),a("."+b.paginationClass+" li a",c).on("click",function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$"),n!=q&&w("pagination",j,q),!1}),a("a.link",c).on("click",function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$")-1,n!=q&&w("pagination",j,q),!1}),b.play&&(v=setInterval(function(){w("next",i)},b.play),c.data("interval",v))}})},a.fn.slides.option={preload:!1,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:!1,next:"next",prev:"prev",pagination:!0,generatePagination:!0,prependPagination:!1,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:!1,randomize:!1,play:0,pause:0,hoverPause:!1,autoHeight:!1,autoHeightSpeed:350,bigTarget:!1,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}},a.fn.randomize=function(b){function c(){return Math.round(Math.random())-.5}return a(this).each(function(){var d=a(this),e=d.children(),f=e.length;if(f>1){e.hide();var g=[];for(i=0;f>i;i++)g[g.length]=i;g=g.sort(c),a.each(g,function(a,c){var f=e.eq(c),g=f.clone(!0);g.show().appendTo(d),void 0!==b&&b(f,g),f.remove()})}})}})(jQuery);

/*! SLIDESJS for Blogger by Taufik Nurrohman <http://gplus.to/tovic> */
(function($, w, d) {

	var sc = slidesJS_config;

	// Hard coding some SLIDESJS configuration...
	sc.slider.container = "slidesJS-container";
	sc.slider.next = "slidesJS-next";
	sc.slider.prev = "slidesJS-prev";
	sc.slider.paginationClass = "slidesJS-pagination";

	var container = d.getElementById(sc.containerId),
		head = d.getElementsByTagName('head')[0],
		s = d.createElement('script'),
		skeleton = '<div class="' + sc.slider.container + '" id="' + sc.slider.container + '" style="width:' + sc.slider.width + 'px;height:' + sc.slider.height + 'px;">',
		title, image, link, date, comment;
	w.blogger_slidesJS = function(json) {
		var entry = json.feed.entry;
		for (var i = 0, ien = entry.length; i < ien; ++i) {
			title = entry[i].title.$t;
			date = entry[i].published.$t.split('-');
			var dd = date[2].substring(0, 2),
				dm = date[1],
				dy = date[0];
			image = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url.replace(/\/s[0-9]+\-c/, "/s" + sc.slider.width) : sc.noImage;
			for (var j = 0, jen = entry[i].link.length; j < jen; ++j) {
				if (entry[i].link[j].rel == "alternate") {
					link = entry[i].link[j].href;
					break;
				}
			}
			for (var k = 0, ken = entry[i].link.length; k < ken; ++k) {
				if (entry[i].link[k].rel == "replies" && entry[i].link[k].type == "text/html") {
					comment = entry[i].link[k].title;
					break;
				}
			}
			skeleton += '<div class="slidesJS-item" style="width:' + sc.slider.width + 'px;height:' + sc.slider.height + 'px;"><a href="' + link + '"' + (sc.newTabLink ? ' target="_blank"' : "") + '><img src="' + image + '" style="display:block;width:' + sc.slider.width + 'px;min-height:' + sc.slider.height + 'px;height:auto;"></a><span class="slidesJS-caption"><span class="slidesJS-title"><a href="' + link + '"' + (sc.newTabLink ? ' target="_blank"' : "") + '>' + title + '</a><span class="slidesJS-meta"><span class="slidesJS-meta-date">' + dd + ' ' + sc.monthArray[parseInt(dm, 10) - 1] + ' ' + dy + '</span><span class="slidesJS-meta-comment">' + comment + '</span></span></span></div>';
		}
		skeleton += '</div><span class="slidesJS-ribbon"></span>';
		container.innerHTML = skeleton;
		$('#' + sc.containerId).css({
			width: sc.slider.width,
			height: sc.slider.height
		}).slides(sc.slider);
	};
	s.src = sc.url.replace(/\/$/, "") + '/feeds/posts/summary' + (sc.labelName !== null ? '/-/' + sc.labelName : "") + '?alt=json-in-script&orderby=published&max-results=' + sc.numPost + '&callback=blogger_slidesJS';
	head.appendChild(s);
})(jQuery, window, document);