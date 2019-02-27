const generateManifest = require('./lib/manifest');
const importer = require('./lib/import');
const extender = require('./lib/extend');
const utils = require('./lib/utils');

module.exports = {
    manifest: generateManifest,
    import: importer,
    extend: extender,
    ...utils,
};
