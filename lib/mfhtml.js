const generateManifest = require('./manifest');

/**
 * The runtime for mfhtml
 */
class MFHTML {
    constructor() {
        this.graph = {};
    }

    /**
     * returns the number of apps in the list
     */
    length() {
        return Object.keys(this.graph).length;
    }

    /**
     * Registers an HTML into internal graph
     * @param {string} html
     */
    register(html) {
        if (html && typeof html === 'string') {
            try {
                const manifest = generateManifest(html);
                this.graph[manifest.appName] = manifest;
            } catch (e) {
                throw new Error('Not able to generate manifest for given html');
            }
        } else {
            throw new Error('mfhml.register requires an html');
        }
    }

    /**
     * Searches and retrieves the app by name and returns the generated html
     * @param {string} appName
     */
    get(appName) {
        const foundAppManifest = this.getManifest(appName);
        // traverse the graph
        return foundAppManifest;
    }

    /**
     * Searches the graph by url and returns the generated html
     * @param {string} alias
     */
    getByAlias(alias) {}

    /**
     * Searches and retrieves the app by name and returns the manifest
     * @param {string} appName
     */
    getManifest(appName) {
        const foundAppManifest = this.graph[appName];
        if (foundAppManifest) {
            // traverse the graph
            return foundAppManifest;
        } else {
            throw new Error(`${appName} is not registered!`);
        }
    }

    /**
     * Searches and retrieves the app by name and returns the manifest meta
     * @param {string} appName
     */
    getMeta(appName) {}

    /**
     * Returns alias and original name
     */
    getAliases() {}

    /**
     * Returns original name of apps
     */
    getAppNames() {}

    /**
     * Searches the graph and returns the dependencies (extends, uses)
     * @param {string} appName
     */
    getDependencies(appName) {}

    /**
     * Searches the graph and returns the missing dependencies (extends, uses)
     * @param {string} appName
     */
    getMissingDependencies(appName) {}
}

module.exports = MFHTML;
