# Mocha Suppress Logs

This module is used to suppress console logs and errors for successful mocha tests and only show them for the ones that fail.

## Usage

```
const suppressLogs = require('mocha-suppress-logs');

// can be called inside describe or in a global mocha setup file

suppressLogs();
```