exports.SomeApp = `
<html lang="en">
    <head>
        <meta export="SampleApp" extends="SomeApp1">
        <title override>SomeApp Title</title>
        <link resource href="someapp.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div override="content-area"><div>Content Override</div></div>
        <div override="header-area"><div><super></super> Override</div></div>
        <script resource src="someapp.js"></script>
    </body>
</html>`;

exports.SomeApp1 = `
<html lang="en">
    <head>
        <meta export="SampleApp1">
        <title public>SomeApp1 Title</title>
        <link resource href="someapp1.css" rel="stylesheet" type="text/css">
        <style>body {padding: 0;}</style>
        <link href="some.mock.css">
        <script>
            console.log('non-resource js');
        </script>
    </head>
    <body>
        <div public="header-area">Header</div>
        <div public="content-area">Content</div>
        <script resource src="someapp1.js"></script>
    </body>
</html>`;

exports.Expected = `
<html lang="en">
    <head>
        <meta export="SampleApp">
        <title>SomeApp Title</title>
        <link resource href="someapp1.css" rel="stylesheet" type="text/css">
        <link resource href="someapp.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <header-area><div>Header Override</div></header-area>
        <content-area><div>Content Override</div></content-area>
        <script resource src="someapp1.js"></script>
        <script resource src="someapp.js"></script>
    </body>
</html>`;
