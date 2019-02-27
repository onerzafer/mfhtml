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
        content: elem.innerText,
    }),
    toContent: dom => {
        Array.from(dom.window.document.getElementsByTagName('script')).forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
        return dom.window.document.body.innerHTML.replace(/\n/g, '').replace(/\s\s*/g, ' ');
    },
    combineUrl: (prefix, urlPart) => [prefix, ...urlPart.split('/').filter(s => s && s !== '')].join('/'),
};
