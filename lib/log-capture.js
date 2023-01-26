'use strict';

const levels = ['log', 'debug', 'info', 'warn', 'error'];
const originalFunctions = levels.map(level => console[level]);

class LogCapture {
  constructor() {
    this.init();
    this._capturing = false;
  }

  init() {
    this._logs = [];
  }

  get() {
    return this._logs;
  }

  print() {
    this._logs.forEach(log => {
      console[log.level](...log.args);
    });
  }

  start() {
    this._capturing = true;

    this._logs = [];
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
    this.init();
  }
}

module.exports = new LogCapture();
