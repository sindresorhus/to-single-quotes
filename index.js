'use strict';
module.exports = function (str) {
	function escapeIfNotPrecededByEscapeChar(escapeChar, match, offset, string) { return string[offset - 1] === escapeChar ? match : escapeChar + match;}
	return str.replace(/(?:\\*)?"([^"\\]*\\.)*[^"]*"/g, function (match) {
		return match
			.replace(/\\"/g, '"')            // unescape double-quotes
			.replace(/'/g, escapeIfNotPrecededByEscapeChar.bind(null, '\\'))
			.replace(/^"|"$/g, '\'');        // convert
	});
};
