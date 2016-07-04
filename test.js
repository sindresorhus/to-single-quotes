import fs from 'fs';
import test from 'ava';
import fn from './';

test('convert matching double-quotes to single-quotes', t => {
	t.is(fn(''), '');
	t.is(fn('foo'), 'foo');
	t.is(fn('\'\''), '\'\'');
	t.is(fn('""'), '\'\'');
	t.is(fn('\'foo\''), '\'foo\'');
	t.is(fn('"foo"'), '\'foo\'');
	t.is(fn('bar "foo" baz'), 'bar \'foo\' baz');
	t.is(fn('\'bar\' "foo" \'baz\''), '\'bar\' \'foo\' \'baz\'');
	t.is(fn(JSON.stringify({a: '<a href="addr">'})), '{\'a\':\'<a href="addr">\'}');
	t.is(fn(JSON.stringify({a: 'aa\n<a href="addr">'})), '{\'a\':\'aa\\n<a href="addr">\'}');
	t.is(fn(JSON.stringify({a: 'b\'\'c'})), '{\'a\':\'b\\\'\\\'c\'}');
});

test('convert matching double-quotes to single-quotes but do not touch escaped backslashes', t => {
	t.is(fn(fs.readFileSync('./tests/do-not-touch-escaped-backslashes/input.txt', 'utf-8')), fs.readFileSync('./tests/do-not-touch-escaped-backslashes/expected-result.txt', 'utf-8'));
});

test('convert matching double-quotes to single-quotes despite backslashes', t => {
	t.is(fn('"1\\\'"'), '\'1\\\\\'\'', 'First sequence in the string');
	t.is(fn('"\\\'"'), '\'\\\\\'\'', 'Not the first sequence in the string');
	t.is(fn('"\\\\\'"'), '\'\\\\\\\'\'', 'Double backslash');
	t.is(fn('"\\\\\' \\\\\'"'), '\'\\\\\\\' \\\\\\\'\'', 'Repetition');
	t.is(fn('"\\\\n \\\\\'"'), '\'\\\\n \\\\\\\'\'', 'With another backslash character');
});
