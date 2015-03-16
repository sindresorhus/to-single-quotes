'use strict';
var assert = require('assert');
var s = require('./');

it('should convert matching double-quotes to single-quotes', function () {
	assert.equal(s(''), '');
	assert.equal(s('foo'), 'foo');
	assert.equal(s('\'\''), '\'\'');
	assert.equal(s('""'), '\'\'');
	assert.equal(s('\'foo\''), '\'foo\'');
	assert.equal(s('"foo"'), '\'foo\'');
	assert.equal(s('bar "foo" baz'), 'bar \'foo\' baz');
	assert.equal(s('\'bar\' "foo" \'baz\''), '\'bar\' \'foo\' \'baz\'');
	assert.equal(s('\\\"foo\\\"'), '\'foo\'');
	assert.equal(s(JSON.stringify({'a': '<a href="addr">'})), '{\'a\':\'<a href="addr">\'}');
	assert.equal(s(JSON.stringify({'a': 'aa\n<a href="addr">'})), '{\'a\':\'aa\\n<a href="addr">\'}');
 	assert.equal(s(JSON.stringify({"a": "b''c" })), "{'a':'b\\\'\\\'c'}");
});
