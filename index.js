'use strict';
const logCapture = require('./lib/log-capture');

const beforeEachCb = function () {
  logCapture.start();
};

const afterEachCb = function () {
  logCapture.stop();

  if (this.currentTest.state !== 'passed') {
    const logs = logCapture.get();

    for (const level in logs) {
      for (const args of logs[level]) {
        console[level](...args);
      }
    }
  }

  logCapture.reset();
};

const suppress = function () {
  if (typeof beforeEach !== 'function') {
    throw Error('Mocha was not loaded');
  }

  beforeEach(beforeEachCb);
  afterEach(afterEachCb);
};

module.exports = suppress;
module.exports.beforeEachCb = beforeEachCb;
module.exports.afterEachCb = afterEachCb;
