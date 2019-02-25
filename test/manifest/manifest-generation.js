const mfhtml = require("../../index").mfhtml;
const assert = require("chai").assert;
const expect = require("chai").expect;
const testHtmls = require("./app.html");
const parsedApp = mfhtml.parse(testHtmls.app);

describe("Manifest", () => {
  it("should have appName", () => {
    expect(mfhtml.manifest(parsedApp))
      .to.have.property("appName")
      .with.equal("SampleApp");
  });

  it("should have uses", () => {
    expect(mfhtml.manifest(parsedApp))
      .to.have.property("uses")
      .with.lengthOf(3);
  });

  it("should have route", () => {
    expect(mfhtml.manifest(parsedApp))
      .to.have.property("route")
      .with.equal("/sampleapp/*");
  });

  it("should have extends", () => {
    expect(mfhtml.manifest(parsedApp))
      .to.have.property("extends")
      .with.equal("ExtendableApp");
  });

  it("should have type", () => {
    expect(mfhtml.manifest(parsedApp))
      .to.have.property("type")
      .with.equal("page");
  });
});
