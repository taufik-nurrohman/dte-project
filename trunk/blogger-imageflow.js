/* var imageflow_config = {
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
	containerId: 'imageflow-container',
	imageflow: {
		loadingText: "Memuat gambar",
		imageWidth: 400
	}
}; */

/*!
Name:       ImageFlow
Version:    1.3.0 (March 9 2010)
Author:     Finn Rudolph
Support:    http://finnrudolph.de/ImageFlow

License:    ImageFlow is licensed under a Creative Commons
            Attribution-Noncommercial 3.0 Unported License
            (http://creativecommons.org/licenses/by-nc/3.0/).

            You are free:
                + to Share - to copy, distribute and transmit the work
                + to Remix - to adapt the work

            Under the following conditions:
                + Attribution. You must attribute the work in the manner specified by the author or licensor
                  (but not in any way that suggests that they endorse you or your use of the work).
                + Noncommercial. You may not use this work for commercial purposes.

            + For any reuse or distribution, you must make clear to others the license terms of this work.
            + Any of the above conditions can be waived if you get permission from the copyright holder.
            + Nothing in this license impairs or restricts the author's moral rights.

Credits:    This script is based on Michael L. Perrys Cover flow in Javascript [1].
            The reflections are generated server-sided by a slightly hacked version
            of Richard Daveys easyreflections [2] written in PHP. The mouse wheel
            support is an implementation of Adomas Paltanavicius JavaScript mouse
            wheel code [3]. It also uses the domReadyEvent from Tanny O'Haley [4].

            [1] http://www.adventuresinsoftware.com/blog/?p=104#comment-1981
            [2] http://reflection.corephp.co.uk/v2.php
            [3] http://adomas.org/javascript-mouse-wheel/
            [4] http://tanny.ica.com/ICA/TKO/tkoblog.nsf/dx/domcontentloaded-for-browsers-part-v

Modified a bit by Taufik Nurrohman (adding `loadingText` option)

*/

/* ImageFlow constructor */
function ImageFlow(){this.defaults={loadingText:"Loading images",animationSpeed:50,aspectRatio:1.964,buttons:false,captions:true,circular:false,imageCursor:"default",ImageFlowID:"imageflow",imageFocusM:1,imageFocusMax:4,imagePath:"",imageScaling:true,imagesHeight:0.67,imagesM:1,onClick:function(){document.location=this.url},opacity:false,opacityArray:[10,8,6,4,2],percentLandscape:118,percentOther:100,preloadImages:true,reflections:true,reflectionGET:"",reflectionP:0.5,reflectionPNG:false,reflectPath:"",scrollbarP:0.6,slider:true,sliderCursor:"e-resize",sliderWidth:14,slideshow:false,slideshowSpeed:1500,slideshowAutoplay:false,startID:1,glideToStartID:true,startAnimation:false,xStep:150};var a=this;this.init=function(d){for(var c in a.defaults){this[c]=(d!==undefined&&d[c]!==undefined)?d[c]:a.defaults[c]}var f=document.getElementById(a.ImageFlowID);if(f){f.style.visibility="visible";this.ImageFlowDiv=f;if(this.createStructure()){this.imagesDiv=document.getElementById(a.ImageFlowID+"_images");this.captionDiv=document.getElementById(a.ImageFlowID+"_caption");this.navigationDiv=document.getElementById(a.ImageFlowID+"_navigation");this.scrollbarDiv=document.getElementById(a.ImageFlowID+"_scrollbar");this.sliderDiv=document.getElementById(a.ImageFlowID+"_slider");this.buttonNextDiv=document.getElementById(a.ImageFlowID+"_next");this.buttonPreviousDiv=document.getElementById(a.ImageFlowID+"_previous");this.buttonSlideshow=document.getElementById(a.ImageFlowID+"_slideshow");this.indexArray=[];this.current=0;this.imageID=0;this.target=0;this.memTarget=0;this.firstRefresh=true;this.firstCheck=true;this.busy=false;var e=this.ImageFlowDiv.offsetWidth;var b=Math.round(e/a.aspectRatio);document.getElementById(a.ImageFlowID+"_loading_txt").style.paddingTop=((b*0.5)-22)+"px";f.style.height=b+"px";this.loadingProgress()}}};this.createStructure=function(){var o=a.Helper.createDocumentElement("div","images");var r,c,g,m;var t=a.ImageFlowDiv.childNodes.length;for(var e=0;e<t;e++){r=a.ImageFlowDiv.childNodes[e];if(r&&r.nodeType==1&&r.nodeName=="IMG"){if(a.reflections===true){c=(a.reflectionPNG)?"3":"2";g=a.imagePath+r.getAttribute("src",2);g=a.reflectPath+"reflect"+c+".php?img="+g+a.reflectionGET;r.setAttribute("src",g)}m=r.cloneNode(true);o.appendChild(m)}}if(a.circular){var f=a.Helper.createDocumentElement("div","images");var l=a.Helper.createDocumentElement("div","images");t=o.childNodes.length;if(t<a.imageFocusMax){a.imageFocusMax=t}if(t>1){var u;for(u=0;u<t;u++){r=o.childNodes[u];if(u<a.imageFocusMax){m=r.cloneNode(true);f.appendChild(m)}if(t-u<a.imageFocusMax+1){m=r.cloneNode(true);l.appendChild(m)}}for(u=0;u<t;u++){r=o.childNodes[u];m=r.cloneNode(true);l.appendChild(m)}for(u=0;u<a.imageFocusMax;u++){r=f.childNodes[u];m=r.cloneNode(true);l.appendChild(m)}o=l}}if(a.slideshow){var n=a.Helper.createDocumentElement("div","slideshow");o.appendChild(n)}var p=a.Helper.createDocumentElement("p","loading_txt");var d=document.createTextNode(" ");p.appendChild(d);var x=a.Helper.createDocumentElement("div","loading");var s=a.Helper.createDocumentElement("div","loading_bar");x.appendChild(s);var q=a.Helper.createDocumentElement("div","caption");var w=a.Helper.createDocumentElement("div","scrollbar");var k=a.Helper.createDocumentElement("div","slider");w.appendChild(k);if(a.buttons){var b=a.Helper.createDocumentElement("div","previous","button");var v=a.Helper.createDocumentElement("div","next","button");w.appendChild(b);w.appendChild(v)}var j=a.Helper.createDocumentElement("div","navigation");j.appendChild(q);j.appendChild(w);var h=false;if(a.ImageFlowDiv.appendChild(o)&&a.ImageFlowDiv.appendChild(p)&&a.ImageFlowDiv.appendChild(x)&&a.ImageFlowDiv.appendChild(j)){t=a.ImageFlowDiv.childNodes.length;for(e=0;e<t;e++){r=a.ImageFlowDiv.childNodes[e];if(r&&r.nodeType==1&&r.nodeName=="IMG"){a.ImageFlowDiv.removeChild(r)}}h=true}return h};this.loadingProgress=function(){var b=a.loadingStatus();if((b<100||a.firstCheck)&&a.preloadImages){if(a.firstCheck&&b==100){a.firstCheck=false;window.setTimeout(a.loadingProgress,100)}else{window.setTimeout(a.loadingProgress,40)}}else{document.getElementById(a.ImageFlowID+"_loading_txt").style.display="none";document.getElementById(a.ImageFlowID+"_loading").style.display="none";window.setTimeout(a.Helper.addResizeEvent,1000);a.refresh();if(a.max>1){a.MouseWheel.init();a.MouseDrag.init();a.Touch.init();a.Key.init();if(a.slideshow){a.Slideshow.init()}if(a.slider){a.scrollbarDiv.style.visibility="visible"}}}};this.loadingStatus=function(){var j=a.imagesDiv.childNodes.length;var e=0,d=0;var b=null;for(var g=0;g<j;g++){b=a.imagesDiv.childNodes[g];if(b&&b.nodeType==1&&b.nodeName=="IMG"){if(b.complete){d++}e++}}var c=Math.round((d/e)*100);var h=document.getElementById(a.ImageFlowID+"_loading_bar");h.style.width=c+"%";if(a.circular){e=e-(a.imageFocusMax*2);d=(c<1)?0:Math.round((e/100)*c)}var k=document.getElementById(a.ImageFlowID+"_loading_txt");var f=document.createTextNode(a.loadingText+" "+d+"/"+e);k.replaceChild(f,k.firstChild);return c};this.refresh=function(){this.imagesDivWidth=a.imagesDiv.offsetWidth+a.imagesDiv.offsetLeft;this.maxHeight=Math.round(a.imagesDivWidth/a.aspectRatio);this.maxFocus=a.imageFocusMax*a.xStep;this.size=a.imagesDivWidth*0.5;this.sliderWidth=a.sliderWidth*0.5;this.scrollbarWidth=(a.imagesDivWidth-(Math.round(a.sliderWidth)*2))*a.scrollbarP;this.imagesDivHeight=Math.round(a.maxHeight*a.imagesHeight);a.ImageFlowDiv.style.height=a.maxHeight+"px";a.imagesDiv.style.height=a.imagesDivHeight+"px";a.navigationDiv.style.height=(a.maxHeight-a.imagesDivHeight)+"px";a.captionDiv.style.width=a.imagesDivWidth+"px";a.captionDiv.style.paddingTop=Math.round(a.imagesDivWidth*0.02)+"px";a.scrollbarDiv.style.width=a.scrollbarWidth+"px";a.scrollbarDiv.style.marginTop=Math.round(a.imagesDivWidth*0.02)+"px";a.scrollbarDiv.style.marginLeft=Math.round(a.sliderWidth+((a.imagesDivWidth-a.scrollbarWidth)/2))+"px";a.sliderDiv.style.cursor=a.sliderCursor;a.sliderDiv.onmousedown=function(){a.MouseDrag.start(this);return false};if(a.buttons){a.buttonPreviousDiv.onclick=function(){a.MouseWheel.handle(1)};a.buttonNextDiv.onclick=function(){a.MouseWheel.handle(-1)}}var f=(a.reflections===true)?a.reflectionP+1:1;var b=a.imagesDiv.childNodes.length;var d=0;var e=null;for(var c=0;c<b;c++){e=a.imagesDiv.childNodes[c];if(e!==null&&e.nodeType==1&&e.nodeName=="IMG"){this.indexArray[d]=c;e.url=e.getAttribute("longdesc");e.xPosition=(-d*a.xStep);e.i=d;if(a.firstRefresh){if(e.getAttribute("width")!==null&&e.getAttribute("height")!==null){e.w=e.getAttribute("width");e.h=e.getAttribute("height")*f}else{e.w=e.width;e.h=e.height}}if((e.w)>(e.h/(a.reflectionP+1))){e.pc=a.percentLandscape;e.pcMem=a.percentLandscape}else{e.pc=a.percentOther;e.pcMem=a.percentOther}if(a.imageScaling===false){e.style.position="relative";e.style.display="inline"}e.style.cursor=a.imageCursor;d++}}this.max=a.indexArray.length;if(a.imageScaling===false){e=a.imagesDiv.childNodes[a.indexArray[0]];this.totalImagesWidth=e.w*a.max;e.style.paddingLeft=(a.imagesDivWidth/2)+(e.w/2)+"px";a.imagesDiv.style.height=e.h+"px";a.navigationDiv.style.height=(a.maxHeight-e.h)+"px"}if(a.firstRefresh){a.firstRefresh=false;a.imageID=a.startID-1;if(a.imageID<0){a.imageID=0}if(a.circular){a.imageID=a.imageID+a.imageFocusMax}maxId=(a.circular)?(a.max-(a.imageFocusMax))-1:a.max-1;if(a.imageID>maxId){a.imageID=maxId}if(a.glideToStartID===false){a.moveTo(-a.imageID*a.xStep)}if(a.startAnimation){a.moveTo(5000)}}if(a.max>1){a.glideTo(a.imageID)}a.moveTo(a.current)};this.moveTo=function(j){this.current=j;this.zIndex=a.max;for(var g=0;g<a.max;g++){var d=a.imagesDiv.childNodes[a.indexArray[g]];var e=g*-a.xStep;if(a.imageScaling){if((e+a.maxFocus)<a.memTarget||(e-a.maxFocus)>a.memTarget){d.style.visibility="hidden";d.style.display="none"}else{var h=(Math.sqrt(10000+j*j)+100)*a.imagesM;var c=j/h*a.size+a.size;d.style.display="block";var i=(d.h/d.w*d.pc)/h*a.size;var b=0;switch(i>a.maxHeight){case false:b=d.pc/h*a.size;break;default:i=a.maxHeight;b=d.w*i/d.h;break}var f=(a.imagesDivHeight-i)+((i/(a.reflectionP+1))*a.reflectionP);d.style.left=c-(d.pc/2)/h*a.size+"px";if(b&&i){d.style.height=i+"px";d.style.width=b+"px";d.style.top=f+"px"}d.style.visibility="visible";switch(j<0){case true:this.zIndex++;break;default:this.zIndex=a.zIndex-1;break}switch(d.i==a.imageID){case false:d.onclick=function(){a.glideTo(this.i)};break;default:this.zIndex=a.zIndex+1;if(d.url!==""){d.onclick=a.onClick}break}d.style.zIndex=a.zIndex}}else{if((e+a.maxFocus)<a.memTarget||(e-a.maxFocus)>a.memTarget){d.style.visibility="hidden"}else{d.style.visibility="visible";switch(d.i==a.imageID){case false:d.onclick=function(){a.glideTo(this.i)};break;default:if(d.url!==""){d.onclick=a.onClick}break}}a.imagesDiv.style.marginLeft=(j-a.totalImagesWidth)+"px"}j+=a.xStep}};this.glideTo=function(g){var b,e;if(a.circular){if(g+1===a.imageFocusMax){e=a.max-a.imageFocusMax;b=-e*a.xStep;g=e-1}if(g===(a.max-a.imageFocusMax)){e=a.imageFocusMax-1;b=-e*a.xStep;g=e+1}}var h=-g*a.xStep;this.target=h;this.memTarget=h;this.imageID=g;var l=a.imagesDiv.childNodes[g].getAttribute("alt");if(l===""||a.captions===false){l="&nbsp;"}a.captionDiv.innerHTML=l;if(a.MouseDrag.busy===false){if(a.circular){this.newSliderX=((g-a.imageFocusMax)*a.scrollbarWidth)/(a.max-(a.imageFocusMax*2)-1)-a.MouseDrag.newX}else{this.newSliderX=(g*a.scrollbarWidth)/(a.max-1)-a.MouseDrag.newX}a.sliderDiv.style.marginLeft=(a.newSliderX-a.sliderWidth)+"px"}if(a.opacity===true||a.imageFocusM!==a.defaults.imageFocusM){a.Helper.setOpacity(a.imagesDiv.childNodes[g],a.opacityArray[0]);a.imagesDiv.childNodes[g].pc=a.imagesDiv.childNodes[g].pc*a.imageFocusM;var d=0;var j=0;var f=0;var k=a.opacityArray.length;for(var c=1;c<(a.imageFocusMax+1);c++){if((c+1)>k){d=a.opacityArray[k-1]}else{d=a.opacityArray[c]}j=g+c;f=g-c;if(j<a.max){a.Helper.setOpacity(a.imagesDiv.childNodes[j],d);a.imagesDiv.childNodes[j].pc=a.imagesDiv.childNodes[j].pcMem}if(f>=0){a.Helper.setOpacity(a.imagesDiv.childNodes[f],d);a.imagesDiv.childNodes[f].pc=a.imagesDiv.childNodes[f].pcMem}}}if(b){a.moveTo(b)}if(a.busy===false){a.busy=true;a.animate()}};this.animate=function(){switch(a.target<a.current-1||a.target>a.current+1){case true:a.moveTo(a.current+(a.target-a.current)/3);window.setTimeout(a.animate,a.animationSpeed);a.busy=true;break;default:a.busy=false;break}};this.glideOnEvent=function(b){if(a.slideshow){a.Slideshow.interrupt()}a.glideTo(b)};this.Slideshow={direction:1,init:function(){(a.slideshowAutoplay)?a.Slideshow.start():a.Slideshow.stop()},interrupt:function(){a.Helper.removeEvent(a.ImageFlowDiv,"click",a.Slideshow.interrupt);a.Slideshow.stop()},addInterruptEvent:function(){a.Helper.addEvent(a.ImageFlowDiv,"click",a.Slideshow.interrupt)},start:function(){a.Helper.setClassName(a.buttonSlideshow,"slideshow pause");a.buttonSlideshow.onclick=function(){a.Slideshow.stop()};a.Slideshow.action=window.setInterval(a.Slideshow.slide,a.slideshowSpeed);window.setTimeout(a.Slideshow.addInterruptEvent,100)},stop:function(){a.Helper.setClassName(a.buttonSlideshow,"slideshow play");a.buttonSlideshow.onclick=function(){a.Slideshow.start()};window.clearInterval(a.Slideshow.action)},slide:function(){var b=a.imageID+a.Slideshow.direction;var c=false;if(b===a.max){a.Slideshow.direction=-1;c=true}if(b<0){a.Slideshow.direction=1;c=true}(c)?a.Slideshow.slide():a.glideTo(b)}};this.MouseWheel={init:function(){if(window.addEventListener){a.ImageFlowDiv.addEventListener("DOMMouseScroll",a.MouseWheel.get,false)}a.Helper.addEvent(a.ImageFlowDiv,"mousewheel",a.MouseWheel.get)},get:function(b){var c=0;if(!b){b=window.event}if(b.wheelDelta){c=b.wheelDelta/120}else{if(b.detail){c=-b.detail/3}}if(c){a.MouseWheel.handle(c)}a.Helper.suppressBrowserDefault(b)},handle:function(d){var c=false;var b=0;if(d>0){if(a.imageID>=1){b=a.imageID-1;c=true}}else{if(a.imageID<(a.max-1)){b=a.imageID+1;c=true}}if(c){a.glideOnEvent(b)}}};this.MouseDrag={object:null,objectX:0,mouseX:0,newX:0,busy:false,init:function(){a.Helper.addEvent(a.ImageFlowDiv,"mousemove",a.MouseDrag.drag);a.Helper.addEvent(a.ImageFlowDiv,"mouseup",a.MouseDrag.stop);a.Helper.addEvent(document,"mouseup",a.MouseDrag.stop);a.ImageFlowDiv.onselectstart=function(){var b=true;if(a.MouseDrag.busy){b=false}return b}},start:function(b){a.MouseDrag.object=b;a.MouseDrag.objectX=a.MouseDrag.mouseX-b.offsetLeft+a.newSliderX},stop:function(){a.MouseDrag.object=null;a.MouseDrag.busy=false},drag:function(f){var b=0;if(!f){f=window.event}if(f.pageX){b=f.pageX}else{if(f.clientX){b=f.clientX+document.body.scrollLeft+document.documentElement.scrollLeft}}a.MouseDrag.mouseX=b;if(a.MouseDrag.object!==null){var g=(a.MouseDrag.mouseX-a.MouseDrag.objectX)+a.sliderWidth;if(g<(-a.newSliderX)){g=-a.newSliderX}if(g>(a.scrollbarWidth-a.newSliderX)){g=a.scrollbarWidth-a.newSliderX}var d,c;if(a.circular){d=(g+a.newSliderX)/(a.scrollbarWidth/(a.max-(a.imageFocusMax*2)-1));c=Math.round(d)+a.imageFocusMax}else{d=(g+a.newSliderX)/(a.scrollbarWidth/(a.max-1));c=Math.round(d)}a.MouseDrag.newX=g;a.MouseDrag.object.style.left=g+"px";if(a.imageID!==c){a.glideOnEvent(c)}a.MouseDrag.busy=true}}};this.Touch={x:0,startX:0,stopX:0,busy:false,first:true,init:function(){a.Helper.addEvent(a.navigationDiv,"touchstart",a.Touch.start);a.Helper.addEvent(document,"touchmove",a.Touch.handle);a.Helper.addEvent(document,"touchend",a.Touch.stop)},isOnNavigationDiv:function(d){var b=false;if(d.touches){var c=d.touches[0].target;if(c===a.navigationDiv||c===a.sliderDiv||c===a.scrollbarDiv){b=true}}return b},getX:function(c){var b=0;if(c.touches){b=c.touches[0].pageX}return b},start:function(b){a.Touch.startX=a.Touch.getX(b);a.Touch.busy=true;a.Helper.suppressBrowserDefault(b)},isBusy:function(){var b=false;if(a.Touch.busy){b=true}return b},handle:function(d){if(a.Touch.isBusy&&a.Touch.isOnNavigationDiv(d)){var b=(a.circular)?(a.max-(a.imageFocusMax*2)-1):(a.max-1);if(a.Touch.first){a.Touch.stopX=(b-a.imageID)*(a.imagesDivWidth/b);a.Touch.first=false}var f=-(a.Touch.getX(d)-a.Touch.startX-a.Touch.stopX);if(f<0){f=0}if(f>a.imagesDivWidth){f=a.imagesDivWidth}a.Touch.x=f;var c=Math.round(f/(a.imagesDivWidth/b));c=b-c;if(a.imageID!==c){if(a.circular){c=c+a.imageFocusMax}a.glideOnEvent(c)}a.Helper.suppressBrowserDefault(d)}},stop:function(){a.Touch.stopX=a.Touch.x;a.Touch.busy=false}};this.Key={init:function(){document.onkeydown=function(b){a.Key.handle(b)}},handle:function(c){var b=a.Key.get(c);switch(b){case 39:a.MouseWheel.handle(-1);break;case 37:a.MouseWheel.handle(1);break}},get:function(b){b=b||window.event;return b.keyCode}};this.Helper={addEvent:function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false)}else{if(d.attachEvent){d["e"+c+b]=b;d[c+b]=function(){d["e"+c+b](window.event)};d.attachEvent("on"+c,d[c+b])}}},removeEvent:function(d,c,b){if(d.removeEventListener){d.removeEventListener(c,b,false)}else{if(d.detachEvent){if(d[c+b]===undefined){alert("Helper.removeEvent » Pointer to detach event is undefined - perhaps you are trying to detach an unattached event?")}d.detachEvent("on"+c,d[c+b]);d[c+b]=null;d["e"+c+b]=null}}},setOpacity:function(b,c){if(a.opacity===true){b.style.opacity=c/10;b.style.filter="alpha(opacity="+c*10+")"}},createDocumentElement:function(c,e,d){var b=document.createElement(c);b.setAttribute("id",a.ImageFlowID+"_"+e);if(d!==undefined){e+=" "+d}a.Helper.setClassName(b,e);return b},setClassName:function(b,c){if(b){b.setAttribute("class",c);b.setAttribute("className",c)}},suppressBrowserDefault:function(b){if(b.preventDefault){b.preventDefault()}else{b.returnValue=false}return false},addResizeEvent:function(){var b=window.onresize;if(typeof window.onresize!="function"){window.onresize=function(){a.refresh()}}else{window.onresize=function(){if(b){b()}a.refresh()}}}}}var domReadyEvent={name:"domReadyEvent",events:{},domReadyID:1,bDone:false,DOMContentLoadedCustom:null,add:function(a){if(!a.$$domReadyID){a.$$domReadyID=this.domReadyID++;if(this.bDone){a()}this.events[a.$$domReadyID]=a}},remove:function(a){if(a.$$domReadyID){delete this.events[a.$$domReadyID]}},run:function(){if(this.bDone){return}this.bDone=true;for(var a in this.events){this.events[a]()}},schedule:function(){if(this.bDone){return}if(/KHTML|WebKit/i.test(navigator.userAgent)){if(/loaded|complete/.test(document.readyState)){this.run()}else{setTimeout(this.name+".schedule()",100)}}else{if(document.getElementById("__ie_onload")){return true}}if(typeof this.DOMContentLoadedCustom==="function"){if(typeof document.getElementsByTagName!=="undefined"&&(document.getElementsByTagName("body")[0]!==null||document.body!==null)){if(this.DOMContentLoadedCustom()){this.run()}else{setTimeout(this.name+".schedule()",250)}}}return true},init:function(){if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){domReadyEvent.run()},false)}setTimeout("domReadyEvent.schedule()",100);function run(){domReadyEvent.run()}if(typeof addEvent!=="undefined"){addEvent(window,"load",run)}else{if(document.addEventListener){document.addEventListener("load",run,false)}else{if(typeof window.onload==="function"){var oldonload=window.onload;window.onload=function(){domReadyEvent.run();oldonload()}}else{window.onload=run}}}
/*@cc_on
@if (@_win32 || @_win64)
document.write("<script id=__ie_onload defer src=\"//:\"><\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function()
{
	if (this.readyState == "complete")
	{
		domReadyEvent.run(); // call the onload handler
	}
};
@end
@*/
}};

/*! ImageFlow for Blogger by Taufik Nurrohman <http://gplus.to/tovic> */
(function(w, d) {
	var sc = imageflow_config,
		container = d.getElementById(sc.containerId),
		head = d.getElementsByTagName('head')[0],
		s = d.createElement('script'),
		skeleton = '<div id="my-imageflow" class="imageflow">',
		title, image, link, date, comment;

	// Hard coding some ImageFlow options
	sc.imageflow.ImageFlowID = "my-imageflow";
	sc.imageflow.reflections = false;
	sc.imageflow.preloadImages = true;

	w.blogger_imageFlow = function(json) {
		var entry = json.feed.entry;
		for (var i = 0, ien = entry.length; i < ien; ++i) {
			title = entry[i].title.$t;
			date = entry[i].published.$t.split('-');
			var dd = date[2].substring(0, 2),
				dm = date[1],
				dy = date[0];
			image = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url.replace(/\/s[0-9]+\-c/, "/s" + sc.imageflow.imageWidth) : sc.noImage;
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
			skeleton += '<img src="' + image + '" style="width:' + sc.imageflow.imageWidth + 'px;height:auto;" alt="&lt;a href=&#39;' + link + '&#39;' + (sc.newTabLink ? ' target=&#39;_blank&#39;' : "") + '&gt;&lt;span class=&#39;imageflow-title&#39;&gt;' + title + '&lt;/span&gt;&lt;span class=&#39;imageflow-date&#39;&gt;' + dd + ' ' + sc.monthArray[parseInt(dm, 10) - 1] + ' ' + dy + '&lt;/span&gt;&lt;span class=&#39;imageflow-comment&#39;&gt;' + comment + '&lt;/span&gt;&lt;/a&gt;">';
		}
		skeleton += '</div>';
		container.innerHTML = skeleton;
		var a = new ImageFlow();
		a.init(sc.imageflow);
	};
	s.src = sc.url.replace(/\/$/, "") + '/feeds/posts/summary' + (sc.labelName !== null ? '/-/' + sc.labelName : "") + '?alt=json-in-script&orderby=published&max-results=' + sc.numPost + '&callback=blogger_imageFlow';
	head.appendChild(s);
})(window, document);