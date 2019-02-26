const JSDOM = require('jsdom').JSDOM;

module.exports = {
    parse: html => new JSDOM(html),
    serialize: dom => dom && dom.serialize && dom.serialize(dom),
    getAttr: (elem, attr) => elem && elem.getAttribute(attr),
    setAttr: (elem, attr, value) => elem.setAttribute(attr, value),
    cleanObject: (obj) => Object.keys(obj).reduce((res, cur) => {
        if(!Array.isArray(obj[cur]) && typeof obj[cur] !== 'undefined') {
            res[cur] = obj[cur]
        } else if (Array.isArray(obj[cur]) && obj[cur].length) {
            res[cur] = obj[cur]
        }
        return res;
    }, {}),
    toBundleItem: (elem) => ({
        type: elem.tagName,
        path: elem.tagName === 'link' ? elem.getAttribute('href') : elem.getAttribute('src'),
        content: elem.innerText,
    }),
    toOverrideItem: (elem) => ({
        target: elem.getAttribute('override') ? elem.getAttribute('override') : elem.tagName,
        content: elem.innerText,
    }),
    toContent: (dom) => {
        Array.from(dom.window.document.getElementsByTagName('script')).forEach((elem) => {
            elem.parentNode.removeChild(elem);
        });
        return dom.window.document.body.innerHTML.replace(/\n/g, '').replace(/\s\s*/g, ' ');
    }
};
