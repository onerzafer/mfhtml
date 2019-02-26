const generateManifest = require('./lib/manifest');
const importer = require('./lib/import');
const utils = require('./lib/utils');

module.exports = {
    manifest: generateManifest,
    import: importer,
    ...utils,
};
