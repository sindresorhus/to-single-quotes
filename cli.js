#!/usr/bin/env node
'use strict';
var fs = require('fs');
var toSingleQuotes = require('./to-single-quotes');
var input = process.argv.slice(2);

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	console.log('to-single-quotes src/*.txt');
	console.log('or');
	console.log('cat input.txt | to-single-quotes > output.txt');
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(require('./package').version);
	return;
}

if (input.length > 0) {
	input.forEach(function (filename) {
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) {
				throw error;
			}

			fs.writeFile(filename, toSingleQuotes(data), function (err) {
				if (err) {
					throw err;
				}

				console.log(filename);
			});
		});
	});

	return;
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
	process.stdout.write(toSingleQuotes(data));
});
