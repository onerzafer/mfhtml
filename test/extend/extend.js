const mfhtml = require('../../index');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const someApp1 = require('./app.html').SomeApp1;
const Expected = require('./app.html').Expected;

const someApp1Parsed = mfhtml.parse(someApp1);
const someAppManifest = mfhtml.manifest(someApp);

describe('Extend', () => {
    it('should extend SomeApp1 with SomeApp and produced expected html', () => {
        const processed = mfhtml.extend(someApp1Parsed, someAppManifest);
        const serialized = mfhtml.serialize(processed);
        expect(serialized).to.be.equal(mfhtml.minify(Expected));
    });
});
