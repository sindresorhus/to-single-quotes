# to-single-quotes [![Build Status](https://travis-ci.org/sindresorhus/to-single-quotes.svg?branch=master)](https://travis-ci.org/sindresorhus/to-single-quotes)

> Convert matching double-quotes to single-quotes: `I "love" unicorns` => `I 'love' unicorns`

See [to-double-quotes](https://github.com/sindresorhus/to-double-quotes) for the inverse.


## Install

Download [manually](https://github.com/sindresorhus/to-single-quotes/releases) or with a package-manager.

```bash
$ npm install --save to-single-quotes
```

```bash
$ bower install --save to-single-quotes
```

```bash
$ component install sindresorhus/to-single-quotes
```


## Usage

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


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global to-single-quotes
```

### Usage

```bash
$ to-single-quotes --help

Usage
  to-single-quotes <path|glob>
  cat input.txt | to-single-quotes > output.txt

Example
  to-single-quotes src/*.txt
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
