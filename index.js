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

      for (const log of logs) {
        console[log.level](...log.args);
      }
    }

    logCapture.reset();
  }
};
