const utils = require('./utils');

module.exports = ($, extendingAppManifest) => {
  utils.injectBundleIntoDom($, extendingAppManifest.bundle);
  $('[export]').attr('export', extendingAppManifest.appName);

  $(
    'script:not([resource]),style:not([resource]),link:not([resource])'
  ).remove();

  if (extendingAppManifest.overrides && extendingAppManifest.overrides.length) {
    extendingAppManifest.overrides.forEach(override => {
      const selector = `${override.tag}[public="${override.target}"]`;
      const $elem = $(selector);
      let content = override.content;
      const superTagPattern = /(<super\s*\/>)|(<super>.*<\/\s*super>)/g;
      if (superTagPattern.test(content)) {
        content = content.replace(superTagPattern, $elem.html());
      }
      const tagName =
        override.target && override.target !== ''
          ? override.target
          : override.tag;
      utils.replaceElement($, selector, tagName, content);
    });
  }
};
