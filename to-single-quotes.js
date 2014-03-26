/*!
	to-single-quotes
	Convert matching double-quotes to single-quotes: I "love" unicorns => I 'love' unicorns
	https://github.com/sindresorhus/to-single-quotes
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';
	var toSingleQuotes = function (str) {
		return str.replace(/(?:\\*)?"([^"\\]*\\")*[^"]*"/g, function (match) {
			return match
				.replace(/\\"/g, '"')            // unescape double-quotes
				.replace(/([^\\])'/g, '$1\\\'')  // escape single-quotes
				.replace(/^"|"$/g, '\'');        // convert
		});
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = toSingleQuotes;
	} else {
		window.toSingleQuotes = toSingleQuotes;
	}
})();
