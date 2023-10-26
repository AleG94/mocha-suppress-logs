'use strict';
const logCapture = require('./lib/log-capture');

exports.mochaHooks = {
  beforeEach() {
    logCapture.start();
  },
  afterEach() {
    logCapture.stop();

    if (this.currentTest.state === 'passed') {
      const capturedLogs = logCapture.get();
      const testResultLog = capturedLogs[capturedLogs.length - 1];
      process[testResultLog.stream].write(testResultLog.text);
    } else {
      logCapture.print();
    }

    logCapture.reset();
  }
};
