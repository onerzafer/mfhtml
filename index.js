const JSDOM = require("jsdom");

const parse = html => new JSDOM.JSDOM(html);

const serialize = dom => dom && dom.serialize && dom.serialize(dom);

const getAttr = (elem, attr) => {
  return elem && elem.getAttribute(attr);
};

const setAttr = (elem, attr, value) => {
  return elem.setAttribute(attr, value);
};

const generateManifest = dom => {
  const manifest = {};
  const _appName = getAttr(
    dom.window.document.querySelector("head meta[mf-define]"),
    "mf-define"
  );
  const _extends = getAttr(
    dom.window.document.querySelector("head meta[mf-define]"),
    "mf-extends"
  );
  const _resolves = getAttr(
    dom.window.document.querySelector("head meta[mf-resolves]"),
    "mf-resolves"
  );
  const _type = getAttr(
    dom.window.document.querySelector("head meta[mf-implements]"),
    "mf-implements"
  ) || 'page';
  const _uses = Array.from(
    dom.window.document.querySelectorAll("head meta[mf-import]")
  ).map(elem => getAttr(elem, "mf-import"));

  if (_appName) {
    manifest.appName = _appName;
  } else {
    throw new Error("<meta mf-define> is not available");
  }

  if (_extends) {
    manifest.extends = _extends;
  }

  if (_resolves) {
    manifest.route = _resolves;
  }

  if (_type) {
    manifest.type = _type;
  }

  if (_uses && _uses.length) {
    manifest.uses = _uses;
  }

  return manifest;
};

const mfhtml = {
  manifest: generateManifest,
  parse: parse,
  serialize: serialize,
  getAttr: getAttr,
  setAttr: setAttr
};

exports.mfhtml = mfhtml;
