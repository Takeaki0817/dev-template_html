/*jshint esversion: 6 */
$(function () {
	let windowWidth = $(window).width();

	/*-------- 画面幅が変わったときに、更新 --------*/
	const autoResizer = () => {
		let timer = 0;
		let currentWidth = window.innerWidth;
		$(window).resize(function () {
			if (currentWidth == window.innerWidth) {
				return;
			}
			if (timer > 0) {
				clearTimeout(timer);
			}
			timer = setTimeout(function () {
				location.reload();
			}, 200);
		});
	};
	/*-------- 画面幅が変わったときに、更新 --------*/
});
