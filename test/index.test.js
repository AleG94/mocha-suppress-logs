'use strict';
const chai = require('chai');
const sinon = require('sinon');
const { mochaHooks } = require('../index');

chai.should();

describe('mocha-suppress-logs', () => {
  const messages = {
    log: 'this is a message log',
    error: 'this is an error log'
  };

  it('should suppress logs and errors when a test case passes', () => {
    sinon.stub(process.stdout, 'write');
    sinon.stub(process.stderr, 'write');

    mochaHooks.beforeEach();

    console.log(messages.log);
    console.error(messages.error);

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    mochaHooks.afterEach.apply({ currentTest: { state: 'passed' } });

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    sinon.restore();
  });

  it('should print logs and errors when a test case fails', () => {
    sinon.stub(process.stdout, 'write');
    sinon.stub(process.stderr, 'write');

    mochaHooks.beforeEach();

    console.log(messages.log);
    console.error(messages.error);

    process.stdout.write.called.should.be.false;
    process.stderr.write.called.should.be.false;

    mochaHooks.afterEach.apply({ currentTest: { state: 'failed' } });

    process.stdout.write.calledWith(messages.log + '\n').should.be.true;
    process.stderr.write.calledWith(messages.error + '\n').should.be.true;

    sinon.restore();
  });
});
