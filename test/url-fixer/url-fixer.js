const utils = require('../../lib/utils');
const urlFix = require('../../lib/url-fixer');
const expect = require('chai').expect;
const someApp = require('./app.html').SomeApp;
const Expected = require('./app.html').Expected;

describe('Url Fix', () => {
  it('should fix img url', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    expect(
      dom.window.document.getElementById('img1').getAttribute('src')
    ).to.be.equal('http://some.domain.name/assets/someimage.jpg');
  });

  it('should fix link url', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    expect(
      dom.window.document.getElementById('link1').getAttribute('href')
    ).to.be.equal('http://some.domain.name/someapp.css');
  });

  it('should not fix link absolute url', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    expect(
      dom.window.document.getElementById('link2').getAttribute('href')
    ).to.be.equal('https://cdn.server.com/someapp.css?13456');
  });

  it('should fix script url', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    expect(
      dom.window.document.getElementById('script1').getAttribute('src')
    ).to.be.equal('http://some.domain.name/js/someapp.js');
  });

  it('should fix video src and poster url', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    expect(
      dom.window.document.getElementById('video1').getAttribute('poster')
    ).to.be.equal('http://some.domain.name/someposter.png');
    expect(
      dom.window.document.getElementById('video1').getAttribute('src')
    ).to.be.equal('http://some.domain.name/somevideo.mpeg');
  });

  it('should fix SomeApp with http://some.domain.name and produce expected html', () => {
    const dom = utils.parse(someApp);
    urlFix(dom, 'http://some.domain.name');
    const serialized = utils.serialize(dom);
    expect(serialized).to.be.equal(utils.minify(Expected));
  });
});
