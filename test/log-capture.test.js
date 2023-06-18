'use strict';
const chai = require('chai');
const sinon = require('sinon');
const logCapture = require('../lib/log-capture');
const should = chai.should();

describe('Log Capture', () => {
  const logs = [
    {
      level: 'log',
      stream: 'stdout',
      content: ['log', 'this is a log message']
    },
    {
      level: 'error',
      stream: 'stderr',
      content: ['error', 'this is an error message']
    }
  ];

  it('should capture logs', () => {
    const stderrWriteStub = sinon.stub(process.stderr, 'write');
    const stdoutWriteStub = sinon.stub(process.stdout, 'write');

    logCapture.start();
    logCapture.isCapturing().should.be.true;

    for (const message of logs) {
      console[message.level](...message.content);
    }

    stdoutWriteStub.called.should.be.false;
    stderrWriteStub.called.should.be.false;

    logCapture.stop();
    logCapture.isCapturing().should.be.false;

    const capturedLogs = logCapture.get();

    capturedLogs.length.should.be.equal(logs.length);

    for (const log of logs) {
      capturedLogs.should.deep.include({ stream: log.stream, text: log.content.join(' ') + '\n' });
    }

    sinon.restore();
  });

  it('throws an error when trying to print logs while capturing', () => {
    logCapture.start();

    should.throw(() => logCapture.print());

    logCapture.stop();
  });

  context('after capturing logs', () => {
    beforeEach(() => {
      logCapture.reset();
      logCapture.start();

      for (const message of logs) {
        console[message.level](...message.content);
      }

      logCapture.stop();
    });

    it('should print logs', () => {
      sinon.stub(process.stderr, 'write');
      sinon.stub(process.stdout, 'write');

      logCapture.print();

      for (const message of logs) {
        process[message.stream].write.calledWith(message.content.join(' ') + '\n').should.be.true;
      }

      sinon.restore();
    });

    it('should reset captured logs', () => {
      logCapture.reset();
      logCapture.get().should.have.length(0);
    });
  });
});
