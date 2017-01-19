'use strict';
module.exports = function (str) {
	var result = "";
	var x, y, len = str.length;
	var betweenQuotes = false;
	var QuoteChar;
	for(x = 0; x < len; x++) {
		//FOUND DOUBLE-QUOTE OR SINGLE-QUOTE
		if(str[x] === '"' || str[x] === '\'') {
			//IF NOT PROCESSING IN BETWEEN QUOTES
			if(!betweenQuotes) {
				QuoteChar = str[x];
				betweenQuotes = true;
				result+= '\'';
			}
			//IF PROCESSING IN BETWEEN QUOTES
			else {
				//CLOSE QUOTES
				if(QuoteChar == str[x]) {
					result+= '\'';
					betweenQuotes = false;
				}
				//STILL INSIDE QUOTES
				else
					result+= '\\\'';
			}

		}
		//IF ESCAPE CHARACTER IS FOUND AND DOUBLE OR SINGLE QUOTE AFTER
		else if(str[x] === '\\' && (str[x+1] === '\'' || str[x+1] === '"')) {
			//ESCAPE + SINGLE QUOTE
			if(str[x+1] === '\'') {
				result+= '\\\\\'';
				x++;
			}
			//ESCAPE + DOUBLE QUOTE
			else if(str[x+1] === '"') {
				result+= '"';
				x++;
			}
			else
				result+= str[x];
		}
		//BACKSLASHES --> DON'T TOUCHE THEM
		else if(str[x] === '\\' && str[x+1] === '\\') {
			result+='\\\\';
			x++;
		}
		else
			result+= str[x];
	}
	return result;
};
