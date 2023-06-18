'use strict';

class LogCapture {
  constructor() {
    this._logs = [];
    this._capturing = false;
    this._streams = ['stdout', 'stderr'];
  }

  get() {
    return this._logs;
  }

  start() {
    this._capturing = true;
    this._originalFunctions = this._streams.map(stream => process[stream].write);
    this._streams.forEach(stream => {
      process[stream].write = text => {
        this._logs.push({ stream, text });
      };
    });
  }

  stop() {
    this._capturing = false;

    this._streams.forEach((stream, i) => {
      process[stream].write = this._originalFunctions[i];
    });
  }

  print() {
    if (this._capturing) {
      throw new Error('Cannot print logs while capturing');
    }

    this._logs.forEach(log => {
      process[log.stream].write(log.text);
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
