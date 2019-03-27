const JSDOM = require('jsdom').JSDOM;
const utils = require('./utils');

module.exports = (dom, extendingAppManifest) => {
    const doc = dom.window.document;
    const _$ = doc.querySelector.bind(doc);
    const _$$ = doc.querySelectorAll.bind(doc);
    utils.injectBundleIntoDom(dom, extendingAppManifest.bundle);
    _$('[export]').setAttribute('export', extendingAppManifest.appName);
    Array.from(_$$('[resource]')).forEach(e => e.setAttribute('resource', 'resource'));
    if (extendingAppManifest.overrides && extendingAppManifest.overrides.length) {
        extendingAppManifest.overrides.forEach(override => {
            const elem = _$(`[public="${override.target}"]`) || _$(`${override.target} [public]`);
            let content = override.content;
            const superTagPattern = /(<super\s*\/>)|(<super>.*<\/\s*super>)/g;
            if ((superTagPattern).test(content)) {
                content = content.replace(superTagPattern, elem.innerHTML);
            }
            utils.replaceElement(dom, elem, override.target, content);
        });
    }
    return dom;
};
