const generateManifest = require('./manifest');
const Extend = require('./extend');
const Import = require('./import');
const UrlFix = require('./url-fixer');
const utils = require('./utils');

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
        let appDom = UrlFix(utils.parse(foundAppManifest.raw), foundAppManifest.baseUrl);
        if (foundAppManifest.extending) {
            if (this.getAppNames().includes(foundAppManifest.extending)) {
                const superDom = utils.parse(this.get(foundAppManifest.extending));
                appDom = Extend(superDom, foundAppManifest);
            } else {
                throw new Error(`undefined super '${foundAppManifest.extending}'`);
            }
        }
        if (foundAppManifest.uses && foundAppManifest.uses.length) {
            appDom = Import(
                appDom,
                foundAppManifest.uses.reduce((importedAppManifest, importedAppName) => {
                    if (this.getAppNames().includes(importedAppName)) {
                        return {
                            ...importedAppManifest,
                            [importedAppName]: generateManifest(this.get(importedAppName)),
                        };
                    } else {
                        throw new Error(`undefined import '${importedAppName}'`);
                    }
                }, {})
            );
        }
        return utils.serialize(appDom);
    }

    /**
     * Searches the graph by url and returns the generated html
     * @param {string} alias
     */
    getAppNameByAlias(alias) {
        if (this.getAliases().length && this.getAliases().includes(alias)) {
            return Object.keys(this.graph)
                    .map(key => this.graph[key])
                    .find(manifest => manifest.alias === alias).appName;
        } else {
            throw new Error(`an app with alias "${alias}" is not registered!`);
        }
    }

    /**
     * Searches and retrieves the app by name and returns the manifest
     * @param {string} appName
     */
    getManifest(appName) {
        if (this.getAppNames().includes(appName)) {
            return this.graph[appName];
        } else {
            throw new Error(`${appName} is not registered!`);
        }
    }

    /**
     * Searches and retrieves the app by name and returns the manifest meta
     * @param {string} appName
     */
    getMeta(appName) {
        const { bundle, overrides, publics, content, raw, ...meta } = this.getManifest(appName);
        return meta;
    }

    /**
     * Returns alias and original name
     */
    getAliases() {
        return Object.keys(this.graph)
            .map(key => this.graph[key].alias)
            .filter(alias => !!alias);
    }

    /**
     * Returns original name of apps
     */
    getAppNames() {
        return Object.keys(this.graph);
    }

    /**
     * Searches the graph and returns the dependencies (extending, uses)
     * @param {string} appName
     */
    getDependencies(appName) {
        const { uses = [], extending } = this.getManifest(appName);
        return !!extending ? [...uses, extending] : uses;
    }

    /**
     * Searches the graph and returns the missing dependencies (extending, uses)
     * @param {string} appName
     */
    getMissingDependencies(appName) {
        const appNames = this.getAppNames();
        return this.getDependencies(appName).filter(dependency => !appNames.includes(dependency));
    }
}

module.exports = MFHTML;
