const utils = require('./utils');

module.exports = (dom, importedApps = {}) => {
  const injected = [];
  const doc = dom.window.document;
  const _$$ = doc.querySelectorAll.bind(doc);
  Array.from(_$$('head [import]')).forEach(elem =>
    elem.parentNode.removeChild(elem)
  );
  Array.from(_$$('fragment')).forEach(elem => {
    const appName = utils.getAttr(elem, 'name');
    if (importedApps[appName] && importedApps[appName].content) {
      // inject content
      utils.replaceElement(dom, elem, appName, importedApps[appName].content);
      if (injected.indexOf(appName) === -1) {
        utils.injectBundleIntoDom(dom, importedApps[appName].bundle);
        injected.push(appName);
      }
    } else {
      elem.parentNode.removeChild(elem);
    }
  });
  Array.from(_$$('[resource]')).forEach(e =>
    e.setAttribute('resource', 'resource')
  );
  return dom;
};
