const utils = require('./utils');

module.exports = html => {
  if (!html || typeof html !== 'string') {
    return;
  }
  const $ = utils.parse(html);

  const manifest = {
    appName: $('head meta[export]').attr('export'),
    baseUrl: $('head meta[public-url]').attr('public-url'),
    extending: $('head meta[extends]').attr('extends'),
    alias: $('head meta[export-as]').attr('export-as'),
    type: $('head meta[of-type]').attr('of-type') || 'page',
    uses: [],
    bundle: [],
    overrides: [],
    publics: [],
    content: utils.toContent(utils.parse(utils.serialize($))) || '',
    raw: utils.minify(html),
  };

  $('meta[import]').each((index, elem) => {
    manifest.uses.push($(elem).attr('import'));
  });

  $('[resource]').each((index, elem) =>
    manifest.bundle.push(utils.toBundleItem($, elem))
  );

  $('[override]').each((index, elem) =>
    manifest.overrides.push(utils.toOverrideItem($, elem))
  );

  $('[public]').each((index, elem) =>
    manifest.publics.push($(elem).attr('public') || elem.name)
  );

  if (!manifest.appName) {
    throw new Error('<meta export> is not available');
  }

  return utils.cleanObject(manifest);
};
