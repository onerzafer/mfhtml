const utils = require('./utils');

module.exports = ($, importedApps = {}) => {
  const injected = [];

  $('head [import]').remove();

  $('fragment').each((index, elem) => {
    const appName = $(elem).attr('name');
    if (importedApps[appName] && importedApps[appName].content) {
      // inject content
      utils.replaceElement($, elem, appName, importedApps[appName].content);
      if (!injected.includes(appName)) {
        utils.injectBundleIntoDom($, importedApps[appName].bundle);
        injected.push(appName);
      }
    } else {
      $(elem).remove(elem);
    }
  });
};
