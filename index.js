'use strict';
module.exports = function (str) {
	var result = "";
	var x, y, len = str.length;
	var betweenQuotes = false;
	for(x = 0; x < len; x++) {
		if(str[x] === '"' || str[x] === '\'') {

			if(!betweenQuotes) {
				betweenQuotes = true;
				result+= '\'';
			}
			else {
					result+= '\'';
				betweenQuotes = false;
			}

		}
		else
			result+= str[x];
	}
	return result;
};
