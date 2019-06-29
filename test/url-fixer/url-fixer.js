const utils = require('../../lib/utils');
const urlFix = require('../../lib/url-fixer');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const Expected = require('./app.html').Expected;

describe('Url Fix', () => {
  it('should fix img url', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    expect($('#img1').attr('src')).to.be.equal(
      'http://some.domain.name/assets/someimage.jpg'
    );
  });

  it('should fix link url', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    expect($('#link1').attr('href')).to.be.equal(
      'http://some.domain.name/someapp.css'
    );
  });

  it('should not fix link absolute url', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    expect($('#link2').attr('href')).to.be.equal(
      'https://cdn.server.com/someapp.css?13456'
    );
  });

  it('should fix script url', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    expect($('#script1').attr('src')).to.be.equal(
      'http://some.domain.name/js/someapp.js'
    );
  });

  it('should fix video src and poster url', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    expect($('#video1').attr('poster')).to.be.equal(
      'http://some.domain.name/someposter.png'
    );
    expect($('#video1').attr('src')).to.be.equal(
      'http://some.domain.name/somevideo.mpeg'
    );
  });

  it('should fix SomeApp with http://some.domain.name and produce expected html', () => {
    const $ = utils.parse(someApp);
    urlFix($, 'http://some.domain.name');
    const serialized = utils.serialize($);
    expect(serialized).to.be.equal(utils.minify(Expected));
  });
});
