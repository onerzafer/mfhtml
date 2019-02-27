const utils = require('./utils');

module.exports = (dom, importedApps = {}) => {
    const doc = dom.window.document;
    const _$$ = doc.querySelectorAll.bind(doc);
    Array.from(_$$('head [import]')).forEach(elem => elem.parentNode.removeChild(elem));
    Array.from(_$$('fragment')).forEach(elem => {
        const appName = utils.getAttr(elem, 'name');
        if (importedApps[appName] && importedApps[appName].content) {
            // inject content
            utils.replaceElement(dom, elem, appName, importedApps[appName].content);
            utils.injectBundleIntoDom(dom, importedApps[appName].bundle);
        } else {
            elem.parentNode.removeChild(elem);
        }
    });
    Array.from(_$$('[resource]')).forEach(e => e.setAttribute('resource', 'resource'));
    return dom;
};
