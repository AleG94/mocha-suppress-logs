'use strict';
const chai = require('chai');
const sinon = require('sinon');
const logCapture = require('../lib/log-capture');

chai.should();

describe('Log Capture', () => {
  const levels = ['log', 'debug', 'info', 'warn', 'error'];
  const messages = {
    log: ['log', 'this is a log message'],
    debug: ['debug', 'this is a debug message'],
    info: ['info', 'this is an info message'],
    warn: ['warn', 'this is a warning message'],
    error: ['error', 'this is an error message']
  };

  it('should capture logs', () => {
    sinon.stub(process.stdout, 'write');
    sinon.stub(process.stderr, 'write');

    logCapture.start();

    logCapture.isCapturing().should.be.true;

    for (const level of levels) {
      console[level](...messages[level]);
    }

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    logCapture.stop();

    logCapture.isCapturing().should.be.false;

    sinon.restore();

    const logs = logCapture.get();

    for (const level in logs) {
      logs[level].should.have.length(1);
      logs[level][0].should.be.deep.equal(messages[level]);
    }
  });

  context('after capturing logs', () => {
    beforeEach(() => {
      logCapture.start();

      for (const level of levels) {
        console[level](...messages[level]);
      }

      logCapture.stop();
    });

    it('should reset captured logs', () => {
      logCapture.reset();

      const logs = logCapture.get();

      for (const level in logs) {
        logs[level].should.have.length(0);
      }
    });
  });
});
