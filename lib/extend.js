const utils = require('./utils');

module.exports = (dom, extendingAppManifest) => {
  const doc = dom.window.document;
  const _$ = doc.querySelector.bind(doc);
  const _$$ = doc.querySelectorAll.bind(doc);
  utils.injectBundleIntoDom(dom, extendingAppManifest.bundle);
  _$('[export]').setAttribute('export', extendingAppManifest.appName);
  Array.from(_$$('[resource]')).forEach(e =>
    e.setAttribute('resource', 'resource')
  );
  Array.from(_$$('script:not([resource]),style:not([resource]),link:not([resource])')).forEach(e =>
    e.parentElement.removeChild(e)
  );
  if (extendingAppManifest.overrides && extendingAppManifest.overrides.length) {
    extendingAppManifest.overrides.forEach(override => {
      const elem = _$(`${override.tag}[public="${override.target}"]`);
      let content = override.content;
      const superTagPattern = /(<super\s*\/>)|(<super>.*<\/\s*super>)/g;
      if (superTagPattern.test(content)) {
        content = content.replace(superTagPattern, elem.innerHTML);
      }
      const tagName = override.target && override.target !== '' ? override.target : override.tag;
      utils.replaceElement(dom, elem, tagName, content);
    });
  }
  return dom;
};
