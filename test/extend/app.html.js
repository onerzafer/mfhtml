exports.SomeApp = /*html*/ `
<html lang="en">
    <head>
        <meta export="SampleApp" extends="SomeApp1">
        <title>SomeApp Title</title>
        <link resource href="someapp.css">
    </head>
    <body>
        <div override="content-area"><div>Content Override</div></div>
        <div override="header-area"><div><super></super> Override</div></div>
        <script resource src="someapp.js"></script>
    </body>
</html>`;

exports.SomeApp1 = /*html*/ `
<html lang="en">
    <head>
        <meta export="SampleApp1">
        <title>SomeApp1 Title</title>
        <link resource href="someapp1.css">
    </head>
    <body>
        <div public="header-area">Header</div>
        <div public="content-area">Content</div>
        <script resource src="someapp1.js"></script>
    </body>
</html>`;

exports.Expected = /*html*/ `
<html lang="en">
    <head>
        <meta export="SampleApp">
        <title>SomeApp1 Title</title>
        <link resource="resource" href="someapp1.css">
        <link resource="resource" href="someapp.css">
    </head>
    <body>
        <header-area><div>Header Override</div></header-area>
        <content-area><div>Content Override</div></content-area>
        <script resource="resource" src="someapp1.js"></script>
        <script resource="resource" src="someapp.js"></script>
    </body>
</html>`;
