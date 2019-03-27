const extend = require('../../lib/extend');
const manifest = require('../../lib/manifest');
const utils = require('../../lib/utils');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const someApp1 = require('./app.html').SomeApp1;
const Expected = require('./app.html').Expected;

const someApp1Parsed = utils.parse(someApp1);
const someAppManifest = manifest(someApp);

describe('Extend', () => {
    it('should extend SomeApp1 with SomeApp and produced expected html', () => {
        const processed = extend(someApp1Parsed, someAppManifest);
        const serialized = utils.serialize(processed);
        expect(serialized).to.be.equal(utils.minify(Expected));
    });
});
