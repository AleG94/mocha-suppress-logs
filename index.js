'use strict';
const logCapture = require('./lib/log-capture');

exports.mochaHooks = {
  beforeEach() {
    logCapture.start();
  },
  afterEach() {
    logCapture.stop();

    if (this.currentTest.state !== 'passed') {
      logCapture.print();
    }

    logCapture.reset();
  }
};
