const utils = require('../../lib/utils');
const _import = require('../../lib/import');
const manifest = require('../../lib/manifest');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const someApp1 = require('./app.html').SomeApp1;
const Expected = require('./app.html').Expected;

const someAppParsed = utils.parse(someApp);
const someApp1Manifest = manifest(someApp1);

describe('Import', () => {
    it('should replace fragment and produce expected html', () => {
        const processed = _import(someAppParsed, { SomeApp1: someApp1Manifest });
        const serialized = utils.serialize(processed);
        expect(serialized).to.be.equal(utils.minify(Expected));
    });
});
