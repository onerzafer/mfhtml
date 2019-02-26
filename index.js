const generateManifest = require('./lib/manifest').generateManifest;
const utils = require('./lib/utils');

module.exports = {
    manifest: generateManifest,
    ...utils,
};
