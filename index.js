'use strict';
const logCapture = require('./lib/log-capture');

exports.mochaHooks = {
  beforeEach() {
    logCapture.start();
  },
  afterEach() {
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
  }
};
