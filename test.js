import fs from 'fs';
import test from 'ava';
import m from './';

test('convert matching double-quotes to single-quotes', t => {
	t.is(m(''), '');
	t.is(m('foo'), 'foo');
	t.is(m('\'\''), '\'\'');
	t.is(m('""'), '\'\'');
	t.is(m('\'foo\''), '\'foo\'');
	t.is(m('"foo"'), '\'foo\'');
	t.is(m('bar "foo" baz'), 'bar \'foo\' baz');
	t.is(m('\'bar\' "foo" \'baz\''), '\'bar\' \'foo\' \'baz\'');
	t.is(m(JSON.stringify({a: '<a href="addr">'})), '{\'a\':\'<a href="addr">\'}');
	/*t.is(m(JSON.stringify({a: 'aa\n<a href="addr">'})), '{\'a\':\'aa\\n<a href="addr">\'}');
	t.is(m(JSON.stringify({a: 'b\'\'c'})), '{\'a\':\'b\\\'\\\'c\'}');*/
});

/*test('convert matching double-quotes to single-quotes but do not touch escaped backslashes', t => {
	t.is(m(fs.readFileSync('fixtures/dont-touch-escaped-backslashes/fixture.txt', 'utf8')), fs.readFileSync('fixtures/dont-touch-escaped-backslashes/expected.txt', 'utf8'));
});

test('convert matching double-quotes to single-quotes despite backslashes', t => {
	t.is(m('"1\\\'"'), '\'1\\\\\'\'', 'First sequence in the string');
	t.is(m('"\\\'"'), '\'\\\\\'\'', 'Not the first sequence in the string');
	t.is(m('"\\\\\'"'), '\'\\\\\\\'\'', 'Double backslash');
	t.is(m('"\\\\\' \\\\\'"'), '\'\\\\\\\' \\\\\\\'\'', 'Repetition');
	t.is(m('"\\\\n \\\\\'"'), '\'\\\\n \\\\\\\'\'', 'With another backslash character');
});*/
