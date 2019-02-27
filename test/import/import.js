const mfhtml = require('../../index');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const someApp1 = require('./app.html').SomeApp1;
const Expected = require('./app.html').Expected;

const someAppParsed = mfhtml.parse(someApp);
const someApp1Parsed = mfhtml.parse(someApp1);
const someApp1Manifest = mfhtml.manifest(someApp1Parsed);

describe('Import', () => {
    it('should replace SomeApp1 fragment ad produced expected html', () => {
        const imported = mfhtml.import(someAppParsed, {SomeApp1: someApp1Manifest});
        const serialized = mfhtml.serialize(imported);
        expect(serialized)
            .to.be.equal(mfhtml.minify(Expected))
    });
});
