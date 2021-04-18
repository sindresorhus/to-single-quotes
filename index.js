function transform(input, toSingleQuotes) {
	let result = '';
	let isBetweenQuotes = false;
	let quoteCharacter;
	let changeTo = '';
	let toChange = '';

	if (toSingleQuotes) {
		changeTo = '\'';
		toChange = '"';
	}	else {
		changeTo = '"';
		toChange = '\'';
	}

	for (let index = 0; index < input.length; index++) {
		const current = input[index];
		const next = input[index + 1];

		// Found double-quote or single-quote
		if (current === '"' || current === '\'') {
			// If not processing in between quotes
			if (!isBetweenQuotes) {
				quoteCharacter = current;
				isBetweenQuotes = true;
				result += changeTo;
			} else if (quoteCharacter === current) {
				// If processing between quotes, close quotes
				result += changeTo;
				isBetweenQuotes = false;
			} else {
				// Still inside quotes
				result += '\\' + changeTo;
			}
		} else if (current === '\\' && (next === '\'' || next === '"')) {
			// If escape character is found and double or single quote after
			// Escape + quote to change to
			if (next === changeTo) {
				// If in between quotes and quote is equal to changeTo only escape once
				result += isBetweenQuotes && quoteCharacter === changeTo ? '\\' + changeTo : '\\\\' + changeTo;
				index++;
			} else if (next === toChange) {
				// Escape + quote to be changed
				// If between quotes can mantain tochange
				result += isBetweenQuotes ? toChange : changeTo;
				index++;
			} else {
				result += current;
			}
		} else if (current === '\\' && next === '\\') {
			// Don't touch backslashes
			result += '\\\\';
			index++;
		} else {
			result += current;
		}
	}

	return result;
}

export default function toSingleQuotes(string) {
	return transform(string, true);
}

toSingleQuotes._transform = transform;
