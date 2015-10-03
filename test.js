/* eslint-env mocha */
'use strict';
var assert = require('assert');
var fn = require('./');

it('should convert matching double-quotes to single-quotes', function () {
	assert.equal(fn(''), '');
	assert.equal(fn('foo'), 'foo');
	assert.equal(fn('\'\''), '\'\'');
	assert.equal(fn('""'), '\'\'');
	assert.equal(fn('\'foo\''), '\'foo\'');
	assert.equal(fn('"foo"'), '\'foo\'');
	assert.equal(fn('bar "foo" baz'), 'bar \'foo\' baz');
	assert.equal(fn('\'bar\' "foo" \'baz\''), '\'bar\' \'foo\' \'baz\'');
	assert.equal(fn('\\\"foo\\\"'), '\'foo\'');
	assert.equal(fn(JSON.stringify({a: '<a href="addr">'})), '{\'a\':\'<a href="addr">\'}');
	assert.equal(fn(JSON.stringify({a: 'aa\n<a href="addr">'})), '{\'a\':\'aa\\n<a href="addr">\'}');
	assert.equal(fn(JSON.stringify({a: 'b\'\'c'})), '{\'a\':\'b\\\'\\\'c\'}');
});

it('should convert matching double-quotes to single-quotes despite backslashes', function () {
	assert.equal(fn('"1\\\'"'), '\'1\\\\\'\'', 'First sequence in the string');
	assert.equal(fn('"\\\'"'), '\'\\\\\'\'', 'Not the first sequence in the string');
	assert.equal(fn('"\\\\\'"'), '\'\\\\\\\'\'', 'Double backslash');
	assert.equal(fn('"\\\\\' \\\\\'"'), '\'\\\\\\\' \\\\\\\'\'', 'Repetition');
	assert.equal(fn('"\\\\n \\\\\'"'), '\'\\\\n \\\\\\\'\'', 'With another backslash character');
});
