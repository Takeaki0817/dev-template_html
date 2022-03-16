let touch =
	'ontouchstart' in document.documentElement ||
	navigator.maxTouchPoints > 0 ||
	navigator.msMaxTouchPoints > 0;

if (touch) {
	// remove all :hover stylesheets
	try {
		// prevent exception on browsers not supporting DOM styleSheets properly
		for (let si in document.styleSheets) {
			let styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(':hover')) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}
