'use strict';

const levels = ['log', 'debug', 'info', 'warn', 'error'];
const originalFunctions = levels.map(level => console[level]);

module.exports = function () {
  beforeEach(function () {
    this._logs = {};

    levels.forEach(level => {
      this._logs[level] = [];

      console[level] = (...args) => {
        this._logs[level].push(args);
      };
    });
  });

  afterEach(function () {
    levels.forEach((level, i) => console[level] = originalFunctions[i]);

    if (this.currentTest.state !== 'passed') {
      for (const level in this._logs) {
        const logs = this._logs[level];

        for (const args of logs) {
          console[level](...args);
        }
      }
    }
  });
};
