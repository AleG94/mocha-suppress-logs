# Mocha Suppress Logs

[![CircleCI][circleci-image]][circleci-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]


Suppress console output of successful mocha tests.

Ideal if you want to keep your test's report clean while still being able to debug the output of failed tests.

**Note**: For `mocha` version 7 or earlier, you must use version [0.2.0](https://www.npmjs.com/package/mocha-suppress-logs/v/0.2.0) of this package.

## Requirements

* [mocha](https://www.npmjs.com/package/mocha) (8.0.0 or higher)

## Installation

```bash
npm install --save-dev mocha-suppress-logs
```

## Usage

Simply require `mocha-suppress-logs` when running `mocha`:

```bash
mocha --require mocha-suppress-logs
```

<br>

Or put it in your [`.mocharc`](https://mochajs.org/#configuring-mocha-nodejs) to make it default behavior:

```json
{
    "require": "mocha-suppress-logs"
}
```

[circleci-image]: https://circleci.com/gh/AleG94/mocha-suppress-logs.svg?style=svg
[circleci-url]: https://circleci.com/gh/AleG94/mocha-suppress-logs
[coveralls-image]: https://coveralls.io/repos/github/AleG94/mocha-suppress-logs/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/AleG94/mocha-suppress-logs?branch=master
[npm-image]: https://img.shields.io/npm/v/mocha-suppress-logs.svg
[npm-url]: https://npmjs.org/package/mocha-suppress-logs
[license-image]: https://img.shields.io/npm/l/mocha-suppress-logs.svg
[license-url]: https://github.com/AleG94/mocha-suppress-logs/blob/master/LICENSE
[downloads-image]: https://img.shields.io/npm/dt/mocha-suppress-logs
[downloads-url]: https://npmjs.org/package/mocha-suppress-logs
