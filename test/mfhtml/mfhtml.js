const MFHTML = require('../../lib/mfhtml');
const expect = require('chai').expect;
const mock = require('./mock.html');

describe('MFHTML runtime', () => {
  let mfhtml;

  beforeEach(() => {
    mfhtml = new MFHTML();
  });

  it("should throw exeption => undefined import 'SomeApp1'", () => {
    mfhtml.register(mock.ExtendableApp);
    mfhtml.register(mock.App);
    expect(() => mfhtml.get('SampleApp')).to.throw(
      "undefined import 'SomeApp1'"
    );
  });

  it("should throw exeption => undefined import 'SomeApp2'", () => {
    mfhtml.register(mock.ExtendableApp);
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    expect(() => mfhtml.get('SampleApp')).to.throw(
      "undefined import 'SomeApp2'"
    );
  });

  it("should throw exeption => undefined import 'SomeApp3'", () => {
    mfhtml.register(mock.ExtendableApp);
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    expect(() => mfhtml.get('SampleApp')).to.throw(
      "undefined import 'SomeApp3'"
    );
  });

  it("should throw exeption => undefined super 'ExtendableApp'", () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    expect(() => mfhtml.get('SampleApp')).to.throw(
      "undefined super 'ExtendableApp'"
    );
  });

  it('should return string', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.get('SampleApp')).is.a('string');
  });

  it('should have length 0', () => {
    expect(mfhtml.length()).to.be.equal(0);
  });

  it('should have length 5', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.length()).to.be.equal(5);
  });

  it('should return empty array on getAppNames', () => {
    expect(mfhtml.getAppNames()).to.be.deep.equal([]);
  });

  it('should throw error on register with empty html', () => {
    expect(() => mfhtml.register()).to.throw('mfhml.register requires an html');
  });

  it('should throw error on register with wrong html', () => {
    expect(() => mfhtml.register(mock.badHtml)).to.throw(
        '<meta export> is not available'
    );
  });

  it('should register without any problem', () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.length()).to.be.equal(1);
  });

  it('should throw error on get for unregistered app', () => {
    expect(() => mfhtml.get('SomeNonRegisteredApp')).to.throw(
      'SomeNonRegisteredApp is not registered!'
    );
  });

  it('should return NoDepApp prepared html', () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.get('NoDepApp')).is.a('string');
  });

  it('should return NoDepApp manifest', () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.getManifest('NoDepApp')).to.deep.equal(
      mock.noDependencyAppManifest
    );
  });

  it('should throw error for non existent alias', () => {
    mfhtml.register(mock.App);
    expect(() => mfhtml.getAppNameByAlias('/none/existing/alias/*')).to.throw(
      'an app with alias "/none/existing/alias/*" is not registered!'
    );
  });

  it('should return string with existent alias', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.getAppNameByAlias('/sampleapp/*')).is.equal('SampleApp');
  });

  it('should throw error on getMeta for unregistered app', () => {
    expect(() => mfhtml.getMeta('SomeNonRegisteredApp')).to.throw(
      'SomeNonRegisteredApp is not registered!'
    );
  });

  it("should return meta of app on getMeta with keys ['appName', 'extending', 'alias', 'type', 'uses']", () => {
    mfhtml.register(mock.App);
    expect(mfhtml.getMeta('SampleApp')).to.have.all.keys([
      'appName',
      'extending',
      'alias',
      'type',
      'uses',
    ]);
    expect(mfhtml.getMeta('SampleApp')).to.not.have.all.keys([
      'bundle',
      'overrides',
      'publics',
      'content',
      'raw',
    ]);
  });

  it("should return meta of app on getMeta with keys ['appName', 'type']", () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.getMeta('NoDepApp')).to.have.all.keys(['appName', 'type']);
    expect(mfhtml.getMeta('NoDepApp')).to.not.have.all.keys([
      'extending',
      'alias',
      'uses',
      'bundle',
      'overrides',
      'publics',
      'content',
      'raw',
    ]);
  });

  it('should return empty array on getAliases', () => {
    expect(mfhtml.getAliases()).to.be.deep.equal([]);
  });

  it('should return empty array on getDependencies', () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.getDependencies('NoDepApp')).to.be.deep.equal([]);
  });

  it('should return an array on getDependencies', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.getDependencies('SampleApp').sort()).to.be.deep.equal(
      ['SomeApp1', 'SomeApp2', 'SomeApp3', 'ExtendableApp'].sort()
    );
  });

  it('should return an empty array on getMissingDependencies', () => {
    mfhtml.register(mock.noDependencyApp);
    expect(mfhtml.getMissingDependencies('NoDepApp')).to.be.deep.equal([]);
  });

  it('should return an array on getMissingDependencies', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.getMissingDependencies('SampleApp').sort()).to.be.deep.equal(
      ['SomeApp1', 'SomeApp2', 'SomeApp3'].sort()
    );
  });

  it('should clean privates', () => {
    mfhtml.register(mock.App);
    mfhtml.register(mock.SomeApp1);
    mfhtml.register(mock.SomeApp2);
    mfhtml.register(mock.SomeApp3);
    mfhtml.register(mock.ExtendableApp);
    expect(mfhtml.get('SampleApp').search('private')).to.be.equal(-1);
  });
});
