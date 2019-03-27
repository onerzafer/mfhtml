// PUBLIC API

module.exports = {
    register: (html, options) => {}, // returns manifest
    get: (appName) => {}, // return html
    getByUrl: (url) => {}, // return html
    getDependencies: (appName) => {}, // return array of dependencies
    getMissingDependencies: (appName) => {}, // return array of dependencies
};
