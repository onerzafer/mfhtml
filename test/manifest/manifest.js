const manifest = require('../../lib/manifest');
const utils = require('../../lib/utils');
const expect = require('chai').expect;
const testHtmls = require('./app.html');
const parsedApp = testHtmls.app;

describe('Manifest', () => {
    it('should have appName', () => {
        expect(manifest(parsedApp))
            .to.have.property('appName')
            .with.equal('SampleApp');
    });

    it('should have uses', () => {
        expect(manifest(parsedApp))
            .to.have.property('uses')
            .with.lengthOf(3);
    });

    it('should have route', () => {
        expect(manifest(parsedApp))
            .to.have.property('route')
            .with.equal('/sampleapp/*');
    });

    it('should have extends', () => {
        expect(manifest(parsedApp))
            .to.have.property('extends')
            .with.equal('ExtendableApp');
    });

    it('should have type', () => {
        expect(manifest(parsedApp))
            .to.have.property('type')
            .with.equal('page');
    });

    it('should have bundle', () => {
        expect(manifest(parsedApp))
            .to.have.property('bundle')
            .with.lengthOf(4);
    });

  it('should have overrides', () => {
    expect(manifest(parsedApp))
        .to.have.property('overrides')
        .with.lengthOf(2);
  });

  it('should have publics', () => {
    expect(manifest(parsedApp))
        .to.have.property('publics')
        .with.lengthOf(1);
  });

  it('should have content', () => {
    expect(manifest(parsedApp))
        .to.have.property('content')
        .with.equal(utils.minify(` <div public="header">Overrideable</div> <div override="content-area"></div> `));
  });

    it('should have raw', () => {
        expect(manifest(parsedApp))
            .to.have.property('raw')
            .with.equal(utils.minify(parsedApp));
    });
});
