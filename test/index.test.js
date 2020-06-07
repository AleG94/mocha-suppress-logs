'use strict';
const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const { beforeEachCb, afterEachCb } = require('..');

chai.should();

describe('mocha-suppress-logs', () => {
  const messages = {
    log: 'this is a message log',
    error: 'this is an error log'
  };

  it('should suppress logs and errors when a test case passes', () => {
    sinon.stub(process.stdout, 'write');
    sinon.stub(process.stderr, 'write');

    beforeEachCb();

    console.log(messages.log);
    console.error(messages.error);

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    afterEachCb.apply({ currentTest: { state: 'passed' } });

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    sinon.restore();
  });

  it('should print logs and errors when a test case fails', () => {
    sinon.stub(process.stdout, 'write');
    sinon.stub(process.stderr, 'write');

    beforeEachCb();

    console.log(messages.log);
    console.error(messages.error);

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    afterEachCb.apply({ currentTest: { state: 'failed' } });

    process.stdout.write.calledWith(messages.log + '\n').should.be.true;
    process.stderr.write.calledWith(messages.error + '\n').should.be.true;

    sinon.restore();
  });

  it('should pass the right callback to mocha beforeEach', () => {
    const suppressLogs = rewire('..');

    const beforeEachSpy = sinon.spy(beforeEach);
    const beforeEachCb = sinon.stub();

    suppressLogs.__set__('afterEach', () => sinon.stub());
    suppressLogs.__set__('beforeEach', beforeEachSpy);
    suppressLogs.__set__('beforeEachCb', beforeEachCb);

    suppressLogs();

    beforeEachSpy.calledWith(beforeEachCb).should.be.true;
  });

  it('should pass the right callback to mocha afterEach', () => {
    const suppressLogs = rewire('..');

    const afterEachSpy = sinon.spy(beforeEach);
    const afterEachCb = sinon.stub();

    suppressLogs.__set__('beforeEach', () => sinon.stub());
    suppressLogs.__set__('afterEach', afterEachSpy);
    suppressLogs.__set__('afterEachCb', afterEachCb);

    suppressLogs();

    afterEachSpy.calledWith(afterEachCb).should.be.true;
  });

  it('should throw an error if mocha was not loaded', () => {
    const suppressLogs = rewire('..');

    suppressLogs.__set__('beforeEach', undefined);

    suppressLogs.should.throw('Mocha was not loaded');
  });
});
