const cheerio = require('cheerio');
const htmlMinify = require('html-minifier').minify;
const minifyOptions = {
  collapseWhitespace: true,
  removeTagWhitespace: true,
  html5: true,
  collapseBooleanAttributes: true,
};

const parse = html => cheerio.load(html);

const minify = html => htmlMinify(html, minifyOptions);

const serialize = $ => $ && minify($.html());

const replaceElement = ($, elemSelector, tag, content) => {
  if (content) {
    const wrapper = `<${tag}>${content}</${tag}>`;
    $(elemSelector).replaceWith(wrapper);
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

const toBundleItem = ($, elem) => ({
  type: elem.name.toUpperCase(),
  content: minify($(elem).html()),
  attributes: cleanObject(Object.assign({}, elem.attribs || {})),
});

const toOverrideItem = ($, elem) => ({
  tag: elem.name.toUpperCase(),
  target: $(elem).attr('override'),
  content: $(elem).html(),
});

const toContent = $ => {
  $('script').remove();
  return minify($('body').html());
};

const combineUrl = (prefix, urlPart) =>
  [prefix, ...urlPart.split('/').filter(s => s && s !== '')]
    .join('/')
    .replace('/./', '/');

const attributesToString = attributes =>
  Object.entries(attributes)
    .map(([atr, value]) => `${atr}="${value}"`)
    .join(' ');

const injectBundleIntoDom = ($, bundle) => {
  if (!bundle || !bundle.length) {
    return;
  }
  const headerTypes = ['LINK', 'STYLE'];
  const bodyTypes = ['SCRIPT'];
  const headContent = bundle
    .filter(({ type }) => headerTypes.includes(type))
    .map(
      ({ type, content, attributes }) =>
        `<${type} resource ${attributesToString(attributes)}>${content}</${type}>`
    )
    .join('');
  const bodyContent = bundle
    .filter(({ type }) => bodyTypes.includes(type))
    .map(
      ({ type, content, attributes }) =>
        `<${type} resource ${attributesToString(attributes)}>${content}</${type}>`
    )
    .join('');
  $('head').append(headContent);
  $('body').append(bodyContent);
};

const cleanPrivates = $ => {
  $('[private]').remove();
};

const injectScript = ($, script) => {
  $('script')
    .first()
    .before(script);
};

module.exports = {
  parse,
  minify,
  serialize,
  replaceElement,
  cleanObject,
  toBundleItem,
  toOverrideItem,
  toContent,
  combineUrl,
  injectBundleIntoDom,
  cleanPrivates,
  injectScript,
};
