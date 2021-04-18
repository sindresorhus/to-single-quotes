import fs from 'fs';
import test from 'ava';
import toSingleQuotes from './index.js';

test('convert matching double-quotes to single-quotes', t => {
	t.is(toSingleQuotes(''), '');
	t.is(toSingleQuotes('foo'), 'foo');
	t.is(toSingleQuotes('\'\''), '\'\'');
	t.is(toSingleQuotes('""'), '\'\'');
	t.is(toSingleQuotes('\'foo\''), '\'foo\'');
	t.is(toSingleQuotes('"foo"'), '\'foo\'');
	t.is(toSingleQuotes('bar "foo" baz'), 'bar \'foo\' baz');
	t.is(toSingleQuotes('\'bar\' "foo" \'baz\''), '\'bar\' \'foo\' \'baz\'');
	t.is(toSingleQuotes(JSON.stringify({a: '<a href="addr">'})), '{\'a\':\'<a href="addr">\'}');
	t.is(toSingleQuotes(JSON.stringify({a: 'aa\n<a href="addr">'})), '{\'a\':\'aa\\n<a href="addr">\'}');
	t.is(toSingleQuotes(JSON.stringify({a: 'b\'\'c'})), '{\'a\':\'b\\\'\\\'c\'}');
});

test('convert matching double-quotes to single-quotes but do not touch escaped backslashes', t => {
	t.is(toSingleQuotes(fs.readFileSync('fixtures/dont-touch-escaped-backslashes/fixture.txt', 'utf8')), fs.readFileSync('fixtures/dont-touch-escaped-backslashes/expected.txt', 'utf8'));
});

test('convert matching double-quotes to single-quotes despite backslashes', t => {
	t.is(toSingleQuotes('"1\\\'"'), '\'1\\\\\'\'', 'First sequence in the string');
	t.is(toSingleQuotes('"\\\'"'), '\'\\\\\'\'', 'Not the first sequence in the string');
	t.is(toSingleQuotes('"\\\\\'"'), '\'\\\\\\\'\'', 'Double backslash');
	t.is(toSingleQuotes('"\\\\\' \\\\\'"'), '\'\\\\\\\' \\\\\\\'\'', 'Repetition');
	t.is(toSingleQuotes('"\\\\n \\\\\'"'), '\'\\\\n \\\\\\\'\'', 'With another backslash character');
});

test('handles inner double-quotes', t => {
	t.is(toSingleQuotes('\'bar "foo" baz\''), '\'bar \\\'foo\\\' baz\'');
});
