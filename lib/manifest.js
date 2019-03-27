const utils = require('./utils');
const JSDOM = require('JSDOM').JSDOM;

module.exports = html => {
    if(!html || typeof html !== 'string') {
        return;
    }
    const dom = utils.parse(html);
    const _$ = dom.window.document.querySelector.bind(dom.window.document);
    const _$$ = dom.window.document.querySelectorAll.bind(dom.window.document);
    const manifest = utils.cleanObject({
        appName: utils.getAttr(_$('head meta[export]'), 'export'),
        extends: utils.getAttr(_$('head meta[export]'), 'extends') || undefined,
        alias: utils.getAttr(_$('head meta[export-as]'), 'export-as') || undefined,
        type: utils.getAttr(_$('head meta[of-type]'), 'of-type') || 'page',
        uses: Array.from(_$$('head meta[import]')).map(elem => utils.getAttr(elem, 'import')),
        bundle: Array.from(_$$('[resource]')).map(elem => utils.cleanObject(utils.toBundleItem(elem))),
        overrides: Array.from(_$$('[override]')).map(elem => utils.cleanObject(utils.toOverrideItem(elem))),
        publics: Array.from(_$$('[public]')).map(elem => utils.getAttr(elem, 'public') || elem.tagName),
        content: utils.toContent(new JSDOM(dom.serialize())) || '',
        raw: utils.minify(html),
    });

    if (!manifest.appName) {
        throw new Error('<meta export> is not available');
    }

    return manifest;
};
