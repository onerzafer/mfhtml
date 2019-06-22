const JSDOM = require('jsdom').JSDOM;
const htmlMinify = require('html-minifier').minify;
const minifyOptions = {
  collapseWhitespace: true,
  removeTagWhitespace: true,
  html5: true,
  collapseBooleanAttributes: true,
};

const parse = html => new JSDOM(html);

const minify = html => htmlMinify(html, minifyOptions);

const serialize = dom => dom && dom.serialize && minify(dom.serialize(dom));

const getAttr = (elem, attr) => elem && elem.getAttribute(attr);

const setAttr = (elem, attr, value) => elem.setAttribute(attr, value);

const replaceElement = (dom, elem, tag, content) => {
  if (content) {
    const doc = dom.window.document;
    const wrapper = doc.createElement(tag);
    wrapper.innerHTML = content;
    elem && elem.parentNode.replaceChild(wrapper, elem);
  }
};

const cleanObject = obj =>
  Object.keys(obj).reduce((res, cur) => {
    if (
      !Array.isArray(obj[cur]) &&
      typeof obj[cur] !== 'undefined' &&
      obj[cur] !== null
    ) {
      res[cur] = obj[cur];
    } else if (
      Array.isArray(obj[cur]) &&
      obj[cur].filter(s => s !== null && typeof s !== 'undefined').length
    ) {
      res[cur] = obj[cur].filter(s => s !== null && typeof s !== 'undefined');
    }
    return res;
  }, {});

const toBundleItem = elem => ({
  type: elem.tagName,
  path:
    elem.tagName === 'LINK'
      ? elem.getAttribute('href')
      : elem.getAttribute('src'),
  content: minify(elem.innerHTML),
});

const toOverrideItem = elem => ({
  target: elem.getAttribute('override')
    ? elem.getAttribute('override')
    : elem.tagName,
  content: elem.innerHTML,
});

const toContent = dom => {
  Array.from(dom.window.document.getElementsByTagName('script')).forEach(
    elem => {
      elem.parentNode.removeChild(elem);
    }
  );
  return minify(dom.window.document.body.innerHTML);
};

const combineUrl = (prefix, urlPart) =>
  [prefix, ...urlPart.split('/').filter(s => s && s !== '')]
    .join('/')
    .replace('/./', '/');

const injectBundleIntoDom = (dom, bundle) => {
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
};

const cleanPrivates = (dom) => {
  const doc = dom.window.document;
  const _$$ = doc.querySelectorAll.bind(doc);
  Array.from(_$$('[private]')).forEach(elem =>
    elem.parentNode.removeChild(elem)
  );
  return dom;
};

module.exports = {
  parse,
  minify,
  serialize,
  getAttr,
  setAttr,
  replaceElement,
  cleanObject,
  toBundleItem,
  toOverrideItem,
  toContent,
  combineUrl,
  injectBundleIntoDom,
  cleanPrivates,
};
