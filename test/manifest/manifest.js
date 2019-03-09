const mfhtml = require('../../index');
const expect = require('chai').expect;
const testHtmls = require('./app.html');

describe('Manifest', () => {
    it('should have appName', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('appName')
            .with.equal('SampleApp');
    });

    it('should have uses', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('uses')
            .with.lengthOf(3);
    });

    it('should have route', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('route')
            .with.equal('/sampleapp/*');
    });

    it('should have extends', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('extends')
            .with.equal('ExtendableApp');
    });

    it('should have type', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('type')
            .with.equal('page');
    });

    it('should have bundle', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('bundle')
            .with.lengthOf(4);
    });

    it('should have overrides', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('overrides')
            .with.lengthOf(2);
    });

    it('should have publics', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('publics')
            .with.lengthOf(1);
    });

    it('should have content', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('content')
            .with.equal(mfhtml.minify(` <div public="header">Overrideable</div> <div override="content-area"></div> `));
    });

    it('should have raw', () => {
        expect(mfhtml.manifest(testHtmls.app))
            .to.have.property('raw')
            .with.equal(mfhtml.minify(testHtmls.app));
    });
});
