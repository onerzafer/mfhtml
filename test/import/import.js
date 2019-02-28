const mfhtml = require('../../index');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const someApp1 = require('./app.html').SomeApp1;
const Expected = require('./app.html').Expected;

const someAppParsed = mfhtml.parse(someApp);
const someApp1Manifest = mfhtml.manifest(someApp1);

describe('Import', () => {
    it('should replace fragment and produce expected html', () => {
        const processed = mfhtml.import(someAppParsed, { SomeApp1: someApp1Manifest });
        const serialized = mfhtml.serialize(processed);
        expect(serialized).to.be.equal(mfhtml.minify(Expected));
    });
});
