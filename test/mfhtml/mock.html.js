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
            type: 'STYLE',
            content: 'body, html { padding: 0; margin: 0; }',
        },
    ],
    content: '<div class="container">Container of NoDepApp</div>',
    raw: utils.minify(noDependencyApp),
};
