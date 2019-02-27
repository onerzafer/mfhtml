const utils = require('./utils');

module.exports = (dom, importedApps = {}) => {
    const doc = dom.window.document;
    const _$$ = doc.querySelectorAll.bind(doc);
    const head = doc.getElementsByTagName('head')[0];
    const body = doc.body;
    Array.from(_$$('head [import]')).forEach(elem => elem.parentNode.removeChild(elem));
    Array.from(_$$('fragment')).forEach(elem => {
        const appName = utils.getAttr(elem, 'name');
        if (importedApps[appName] && importedApps[appName].content) {
            // inject content
            const wrapper = doc.createElement(appName);
            wrapper.innerHTML = importedApps[appName].content;
            elem.parentNode.replaceChild(wrapper, elem);

            if (importedApps[appName].bundle && importedApps[appName].bundle.length) {
                importedApps[appName].bundle.forEach(item => {
                    const typesWithContent = ['SCRIPT', 'STYLE'];
                    const typesWithPath = ['SCRIPT', 'LINK'];
                    const { type, path, content } = item;
                    const itemElem = doc.createElement(type);
                    itemElem.setAttribute('resource', 'resource');
                    if (typesWithPath.some(t => t === type) && path) {
                        itemElem.setAttribute(
                            type === 'LINK' ? 'href' : 'src',
                            path
                        );
                    }
                    if (typesWithContent.some(t => t === type) && content) {
                        const textNode = doc.createTextNode(content);
                        itemElem.appendChild(textNode);
                    }
                    switch (type) {
                        case 'LINK':
                        case 'STYLE':
                            head.appendChild(itemElem);
                            break;
                        case 'SCRIPT':
                            body.appendChild(itemElem);
                            break;
                        default:
                            throw new Error('Unexpected type for bundle item ' + type);
                    }
                });
                Array.from(_$$('[resource]')).forEach(e => e.setAttribute('resource', 'resource'))
            }
        } else {
            elem.parentNode.removeChild(elem);
        }
    });
    return dom;
};
