$(function () {
	let urlHash = location.hash;
	let homeUrl = 'index.html';

	const headerHeight = $('.ly_header').height();

	if (urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function () {
			let targetId = urlHash.replace('/', '');
			let target = $(`${targetId}`);
			let position = target.offset().top - headerHeight;
			$('body,html').stop().animate(
				{
					scrollTop: position,
				},
				600
			);
		}, 100);
	}
	$(`a[href^="${homeUrl}#"]`).click(function () {
		let href = $(this).attr('href');
		let targetId = href.replace(`${homeUrl}`, '').replace('', '');
		let target = $(`${targetId}`);
		let position = target.offset().top - headerHeight;
		$('body,html').stop().animate(
			{
				scrollTop: position,
			},
			600
		);

		return false;
	});
});
