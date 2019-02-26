const utils = require('./utils');

module.exports = (dom, importedApps = {}) => {
    const _$ = dom.window.document.querySelector.bind(dom.window.document);
    const _$$ = dom.window.document.querySelectorAll.bind(dom.window.document);
    const doc = dom.window.document;
    Array.from(_$$('head [import]')).forEach(elem => elem.parentNode.removeChild(elem));
    Array.from(_$$('fragment')).forEach(elem => {
        const appName = utils.getAttr(elem, 'name');
        if (importedApps[appName] && importedApps[appName].content) {
            // append css

            // inject content
            const wrapper = doc.createElement(appName);
            wrapper.innerHTML = importedApps[appName].content;
            elem.parentNode.replaceChild(wrapper, elem);

            // append js
        } else {
            elem.parentNode.removeChild(elem);
        }
    });
    return dom;
};
