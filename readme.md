# to-single-quotes [![Build Status](https://travis-ci.org/sindresorhus/to-single-quotes.png?branch=master)](http://travis-ci.org/sindresorhus/to-single-quotes)

> Convert matching double-quotes to single-quotes: `I "love" unicorns` => `I 'love' unicorns`

See [to-double-quotes](https://github.com/sindresorhus/to-double-quotes) for the inverse.


## Install

Download [manually](https://github.com/sindresorhus/to-single-quotes/releases) or with a package-manager.

#### [npm](https://npmjs.org/package/to-single-quotes)

```
npm install --save to-single-quotes
```

#### [Bower](http://bower.io)

```
bower install --save to-single-quotes
```

#### [Component](https://github.com/component/component)

```
component install sindresorhus/to-single-quotes
```


## Example

##### Node.js

```js
var toSingleQuotes = require('to-single-quotes');
```

##### Bower

```html
<script src="bower_components/to-single-quotes/to-single-quotes.js"></script>
```

##### Usage

```js
toSingleQuotes('I love "unicorns" \'and\' "ponies"');
//=> I love 'unicorns' 'and' 'ponies'
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
