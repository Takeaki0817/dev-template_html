$(function () {
	let flag;

	const $hamburger = $('.js_hamburger');
	const $nav = $('.js_nav');
	$hamburger.click(function () {
		$(this).toggleClass('is_active');
		$nav.toggleClass('is_active');

		flag = $nav.hasClass('is_active');

		backfaceFixed(flag);
	});

	function resize() {
		$hamburger.removeClass('is_active');
		$nav.removeClass('is_active');
		backfaceFixed(false);
	}

	// safariでリサイズが発火する現象を解決
	let use = navigator.userAgent;
	let yoko1 = $(window).width();
	const ua = window.navigator.userAgent.toLowerCase();
	const isiPad =
		ua.indexOf('ipad') > -1 ||
		(ua.indexOf('macintosh') > -1 && 'ontouchend' in document);
	const isiOS =
		ua.indexOf('iphone') > -1 ||
		ua.indexOf('ipad') > -1 ||
		(ua.indexOf('macintosh') > -1 && 'ontouchend' in document);
	const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('mobile');
	$(window).resize(function () {
		let yoko2 = $(window).width();
		if (isiPad || isiOS || isAndroid) {
			if (yoko1 != yoko2) {
				yoko1 = yoko2;
				resize();
			}
		} else {
			resize();
		}
	});
});
