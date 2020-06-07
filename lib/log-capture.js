'use strict';

const levels = ['log', 'debug', 'info', 'warn', 'error'];
const originalFunctions = levels.map(level => console[level]);

class LogCapture {
  constructor() {
    this.init();
    this._capturing = false;
  }

  init() {
    this._logs = {};

    levels.forEach(level => {
      this._logs[level] = [];
    });
  }

  get() {
    return this._logs;
  }

  start() {
    this._capturing = true;

    levels.forEach(level => {
      this._logs[level] = [];

      console[level] = (...args) => {
        this._logs[level].push(args);
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
    this.init();
  }
}

module.exports = new LogCapture();
