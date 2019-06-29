const utils = require('../../lib/utils');

exports.badHtml = `
    <html lang="en-US">
        <title>Bad Html</title>
        <body>Bad Html Body</body>
    </html>
`;

const noDependencyApp = `
    <html lang="en-US">
        <meta export="NoDepApp">
        <title>No dependency App</title>
        <style resource>
            body, html {
                padding: 0;
                margin: 0;
            }        
        </style>
        <body>
            <div class="container">Container of NoDepApp</div>
        </body>
    </html>
`;

exports.noDependencyApp = noDependencyApp;

exports.noDependencyAppManifest = {
  appName: 'NoDepApp',
  type: 'page',
  bundle: [
    {
      attributes: {
        resource: '',
      },
      type: 'STYLE',
      content: 'body, html { padding: 0; margin: 0; }',
    },
  ],
  content: '<div class="container">Container of NoDepApp</div>',
  raw: utils.minify(noDependencyApp),
};

exports.App = `
<html lang="en">
    <head>
        <meta import="SomeApp2">
        <meta import="SomeApp3">
        <meta export="SampleApp" export-as="/sampleapp/*" extends="ExtendableApp" of-type="page">
        <title override>SomeApp Title</title>
        <link resource href="/some.scss">
        <style resource>
            html, body {
                padding: 0;
                margin: 0;
            }
            body {
                background: #000000;
                color: #ffffff;
            }
        </style>
    </head>
    <body>
        <div public="header">Overrideable</div>
        <div override="content-area">
            <fragment name="SomeApp2"></fragment>
        </div>
        <script resource>
            console.log('SomeApp is running');        
        </script>
        <script resource src="someapp.js"></script>
    </body>
</html>`;

exports.SomeApp1 = `
<html lang="en">
    <head>
        <meta export="SomeApp1">
        <title>SomeApp Title</title>
        <link resource href="/some1.scss">
    </head>
    <body>
        Some App1 Content
        <script resource src="someapp1.js"></script>
    </body>
</html>`;

exports.SomeApp2 = `
<html lang="en">
    <head>
        <meta export="SomeApp2">
        <title>SomeApp Title</title>
        <link resource href="/some3.scss">
    </head>
    <body>
        Some App1 Content
        <script resource src="someapp3.js"></script>
        <div private></div>
    </body>
</html>`;

exports.SomeApp3 = `
<html lang="en">
    <head>
        <meta export="SomeApp3">
        <title>SomeApp Title</title>
        <link resource href="/some3.scss">
    </head>
    <body>
        <div private></div>
        Some App1 Content
        <script resource src="someapp3.js"></script>
    </body>
</html>`;

exports.ExtendableApp = `
<html lang="en">
    <head>
        <meta import="SomeApp1">
        <meta export="ExtendableApp">
        <title>Super Title</title>
        <link resource href="super.css">
    </head>
    <body>
        <div private></div>
        <div public="header-area">Header</div>
        <div public="content-area">Content</div>
        <fragment name="SomeApp1"></fragment>
        <script resource src="super.js"></script>
    </body>
</html>`;
