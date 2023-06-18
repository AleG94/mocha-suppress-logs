'use strict';

const levels = ['log', 'debug', 'info', 'warn', 'error'];
const originalFunctions = levels.map(level => console[level]);

class LogCapture {
  constructor() {
    this._logs = [];
    this._capturing = false;
  }

  get() {
    return this._logs;
  }

  start() {
    this._capturing = true;

    levels.forEach(level => {
      console[level] = (...args) => {
        this._logs.push({ level, args });
      };
    });
  }

  stop() {
    this._capturing = false;

    levels.forEach((level, i) => {
      console[level] = originalFunctions[i];
    });
  }

  isCapturing() {
    return this._capturing;
  }

  reset() {
    this._logs = [];
  }
}

module.exports = new LogCapture();
