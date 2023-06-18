'use strict';
const chai = require('chai');
const sinon = require('sinon');
const { mochaHooks } = require('../index');
const logCapture = require('../lib/log-capture');

chai.should();

describe('mocha-suppress-logs', () => {
  afterEach(() => sinon.restore());

  it('should be capturing during a test case', () => {
    mochaHooks.beforeEach();
    logCapture.isCapturing().should.be.true;
    mochaHooks.afterEach.apply({ currentTest: { state: 'passed' } });
    logCapture.isCapturing().should.be.false;
  });

  it('should suppress logs and errors when a test case passes', () => {
    sinon.stub(logCapture, 'print');

    mochaHooks.beforeEach();
    mochaHooks.afterEach.apply({ currentTest: { state: 'passed' } });
    logCapture.print.called.should.be.false;
  });

  it('should print logs and errors when a test case fails', () => {
    sinon.stub(logCapture, 'print');

    mochaHooks.beforeEach();
    mochaHooks.afterEach.apply({ currentTest: { state: 'failed' } });
    logCapture.print.called.should.be.true;
  });
});
