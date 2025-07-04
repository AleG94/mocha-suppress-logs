'use strict';
const clone = require('clone');

class LogCapture {
  constructor() {
    this._logs = [];
    this._capturing = false;
    this._levels = ['log', 'debug', 'info', 'warn', 'error'];
    this._originalFunctions = this._levels.map(level => console[level]);
  }

  get() {
    return this._logs;
  }

  start() {
    this._capturing = true;

    this._levels.forEach(level => {
      console[level] = (...args) => {
        this._logs.push({ level, args: this._clone(args) });
      };
    });
  }

  stop() {
    this._capturing = false;

    this._levels.forEach((level, i) => {
      console[level] = this._originalFunctions[i];
    });
  }

  print() {
    if (this._capturing) {
      throw new Error('Cannot print logs while capturing');
    }

    this._logs.forEach(log => {
      console[log.level](...log.args);
    });
  }

  isCapturing() {
    return this._capturing;
  }

  reset() {
    this._logs = [];
  }

  _clone(args) {
    if (typeof structuredClone === 'function') {
      try {
        return structuredClone(args);
      } catch (e) {
        // Fallback to `clone` for objects that structuredClone cannot handle (e.g. functions).
      }
    }

    return clone(args);
  }
}

module.exports = new LogCapture();
