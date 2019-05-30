const manifest = require('../../lib/manifest');
const utils = require('../../lib/utils');
const expect = require('chai').expect;
const testHtmls = require('./app.html');

describe('Manifest', () => {
  it('should have appName', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('appName')
      .with.equal('SampleApp');
  });

  it('should have uses', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('uses')
      .with.lengthOf(3);
  });

  it('should have alias', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('alias')
      .with.equal('/sampleapp/*');
  });

  it('should have extending', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('extending')
      .with.equal('ExtendableApp');
  });

  it('should have type', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('type')
      .with.equal('page');
  });

  it('should have bundle', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('bundle')
      .with.lengthOf(4);
  });

  it('should have overrides', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('overrides')
      .with.lengthOf(2);
  });

  it('should have publics', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('publics')
      .with.lengthOf(1);
  });

  it('should have content', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('content')
      .with.equal(
        utils.minify(
          ` <div public="header">Overrideable</div> <div override="content-area"></div> `
        )
      );
  });

  it('should have raw', () => {
    expect(manifest(testHtmls.app))
      .to.have.property('raw')
      .with.equal(utils.minify(testHtmls.app));
  });
});
