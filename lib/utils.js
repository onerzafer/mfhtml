const JSDOM = require('jsdom').JSDOM;
const minify = require('html-minifier').minify;
const minifyOptions = {
    collapseWhitespace: true,
    removeTagWhitespace: true,
    html5: true,
    collapseBooleanAttributes: true,
};
module.exports = {
    parse: html => new JSDOM(html),
    minify: html => minify(html, minifyOptions),
    serialize: dom => dom && dom.serialize && minify(dom.serialize(dom), minifyOptions),
    getAttr: (elem, attr) => elem && elem.getAttribute(attr),
    setAttr: (elem, attr, value) => elem.setAttribute(attr, value),
    replaceElement: (dom, elem, tag, content) => {
        if (!content) {
            return;
        }
        const doc = dom.window.document;
        const wrapper = doc.createElement(tag);
        wrapper.innerHTML = content;
        elem.parentNode.replaceChild(wrapper, elem);
    },
    cleanObject: obj =>
        Object.keys(obj).reduce((res, cur) => {
            if (!Array.isArray(obj[cur]) && typeof obj[cur] !== 'undefined') {
                res[cur] = obj[cur];
            } else if (Array.isArray(obj[cur]) && obj[cur].length) {
                res[cur] = obj[cur];
            }
            return res;
        }, {}),
    toBundleItem: elem => ({
        type: elem.tagName,
        path: elem.tagName === 'LINK' ? elem.getAttribute('href') : elem.getAttribute('src'),
        content: elem.innerText,
    }),
    toOverrideItem: elem => ({
        target: elem.getAttribute('override') ? elem.getAttribute('override') : elem.tagName,
        content: elem.innerHTML,
    }),
    toContent: dom => {
        Array.from(dom.window.document.getElementsByTagName('script')).forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
        return minify(dom.window.document.body.innerHTML, minifyOptions);
    },
    combineUrl: (prefix, urlPart) =>
        [prefix, ...urlPart.split('/').filter(s => s && s !== '')].join('/').replace('/./', '/'),
    injectBundleIntoDom: (dom, bundle) => {
        if (!bundle || !bundle.length) {
            return;
        }
        const doc = dom.window.document;
        const head = doc.getElementsByTagName('head')[0];
        const body = doc.body;

        bundle.forEach(item => {
            const typesWithContent = ['SCRIPT', 'STYLE'];
            const typesWithPath = ['SCRIPT', 'LINK'];
            const { type, path, content } = item;
            const itemElem = doc.createElement(type);
            itemElem.setAttribute('resource', 'resource');
            if (typesWithPath.some(t => t === type) && path) {
                itemElem.setAttribute(type === 'LINK' ? 'href' : 'src', path);
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
    },
};
