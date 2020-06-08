# Mocha Suppress Logs

[![CircleCI][circleci-image]][circleci-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]


Suppress console output of successful mocha tests.

Ideal if you want to keep your test's report clean while still being able to debug the output of failed tests.

## Installation

```
npm install --save-dev mocha-suppress-logs
```

## Usage

To suppress console output over the entire test suite, create a `setup.js` file under your `test` folder:

```javascript
// test/setup.js

require('mocha-suppress-logs')();
```

Then preload it with mocha:

```
mocha --file test/setup.js
```

\
If instead you want to suppress console output for a specific `describe` or `context` block:


```javascript
const suppressLogs = require('mocha-suppress-logs');

describe('Something', () => {
  suppressLogs();

  it('should do something', () => {
    // test code
  });
});
```

[circleci-image]: https://circleci.com/gh/AleG94/mocha-suppress-logs.svg?style=svg
[circleci-url]: https://circleci.com/gh/AleG94/mocha-suppress-logs
[coveralls-image]: https://coveralls.io/repos/github/AleG94/mocha-suppress-logs/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/AleG94/mocha-suppress-logs?branch=master
[npm-image]: https://img.shields.io/npm/v/mocha-suppress-logs.svg
[npm-url]: https://npmjs.org/package/mocha-suppress-logs
[license-image]: https://img.shields.io/npm/l/mocha-suppress-logs.svg
[license-url]: https://github.com/AleG94/mocha-suppress-logs/blob/master/LICENSE
