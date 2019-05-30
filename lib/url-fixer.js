const utils = require('./utils');

const ElementsWithUrlSelectors = {
  src: [
    'script',
    'frame',
    'iframe',
    'input',
    'audio',
    'video',
    'embed',
    'source',
    'track',
    'img',
  ],
  href: ['a', 'area', 'base', 'link'],
  codebase: ['applet'],
  cite: ['blockquote', 'del', 'ins', 'q'],
  background: ['body'],
  action: ['form'],
  longdesc: ['frame'],
  profile: ['head'],
  usemap: ['img', 'input', 'object'],
  classid: ['object'],
  data: ['object'],
  formaction: ['input', 'button'],
  manifest: ['html'],
  poster: ['video'],
};

/* SPECIAL CASES
    <img srcset="url1 resolution1 url2 resolution2">
    <source srcset="url1 resolution1 url2 resolution2">
    <object archive=url> or <object archive="url1 url2 url3">
    <applet archive=url> or <applet archive=url1,url2,url3>
    <meta http-equiv="refresh" content="seconds; url">
 */

// will ignore inline styles
module.exports = (dom, baseUri) => {
  if (baseUri) {
    _$$ = dom.window.document.querySelectorAll.bind(dom.window.document);
    Object.keys(ElementsWithUrlSelectors).forEach(attr => {
      const tags = ElementsWithUrlSelectors[attr];
      const selector = tags.map(tag => `${tag}[${attr}]`).join(', ');
      Array.from(_$$(selector)).forEach(elem => {
        const attrValue = elem.getAttribute(attr);
        if (attrValue && /https?:\/\//g.test(attrValue) !== true) {
          elem.setAttribute(attr, utils.combineUrl(baseUri, attrValue));
        }
      });
    });
  }
  return dom;
};
