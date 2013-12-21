/*! Full Screen Post by Taufik Nurrohman => http://gplus.to/tovic */
window.postFullScreen = function(config) {
	var defaults = {
		titleSource: document.title,
		contentSource: document.getElementsByTagName('article')[0],
		background: "#fff",
		color: "inherit",
		fontSize: "120%",
		padding: 50,
		maxWidth: 750,
		createButton: document.createElement('button'),
		openText: "Full Screen Mode",
		closeText: "Exit full screen mode",
		appendButtonTo: null,
		beforeInit: null,
		afterInit: null
	};
	for (var i in defaults) {
		defaults[i] = (typeof config[i] != 'undefined') ? config[i] : defaults[i];
	}
	var div = document.createElement('div'), btn = defaults.createButton;
	if (typeof config.beforeInit == 'function') {
		defaults.beforeInit();
	}
	div.innerHTML = '<div style="position:fixed!important;position:absolute;top:0;right:0;bottom:0;left:0;z-index:999999;background:' + defaults.background + ';color:' + defaults.color + ';padding:' + defaults.padding + 'px;padding-bottom:0;font-size:' + defaults.fontSize + ';overflow:auto;letter-spacing:0;text-transform:none;text-shadow:none;display:none;"><div style="max-width:' + defaults.maxWidth + 'px;margin:0 auto ' + defaults.padding + 'px;"><h1 style="font:inherit;color:inherit;margin:0;padding:0;font-size:300%;font-weight:bold;text-transform:none;letter-spacing:0;text-shadow:none;">' + defaults.titleSource.innerHTML + '</h1>' + defaults.contentSource.innerHTML + '</div><div style="text-align:center;margin:' + defaults.padding + 'px 0;"><button style="display:inline;display:inline-block;" onclick="this.parentNode.parentNode.style.display=\'none\';document.body.style.overflow=\'\';return false;">' + defaults.closeText + '</button></div><a href="#exit" style="display:block;position:absolute;top:18px;right:20px;font:normal bold 30px/30px Arial,Sans-Serif;color:inherit;text-decoration:none;overflow:hidden;background:none;opacity:.3;" onclick="this.parentNode.style.display=\'none\';document.body.style.overflow=\'\';return false;" onmousedown="this.style.opacity=0.8;" onmouseup="this.style.opacity=0.4;" onmouseover="this.style.opacity=0.5;" onmouseout="this.style.opacity=0.4;" title="' + defaults.closeText + '">&times;</a></div>';
	btn.innerHTML = defaults.openText;
	btn.onclick = function() {
		div.children[0].style.display = "block";
		document.body.style.overflow = "hidden";
		return false;
	};
	defaults.contentSource.appendChild(div);
	if (defaults.contentSource) {
		if (defaults.appendButtonTo !== false) defaults[defaults.appendButtonTo === null ? "contentSource" : "appendButtonTo"].appendChild(btn);
	} else {
		document.body.appendChild(btn);
	}
	if (typeof defaults.afterInit == 'function') {
		defaults.beforeInit();
	}

	// auto open full screen mode when there is a `#full-screen` hash at the end of the URL
	if (window.location.hash && window.location.hash.replace('#', "") == 'full-screen') {
		div.children[0].style.display = "block";
		document.body.style.overflow = "hidden";
	}
};