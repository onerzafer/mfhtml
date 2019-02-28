exports.SomeApp = `
<html lang="en">
    <head>
        <link resource href="./someapp.css" id="link1">
        <link resource href="https://cdn.server.com/someapp.css?13456" id="link2">
    </head>
    <body>
        <video poster="/someposter.png" src="somevideo.mpeg" id="video1"></video>
        <img src="assets/someimage.jpg" alt="image" id="img1"/>
        <script resource src="/js/someapp.js" id="script1"></script>
    </body>
</html>`;

exports.Expected = `
<html lang="en">
    <head>
        <link resource="" href="http://some.domain.name/someapp.css" id="link1">
        <link resource="" href="https://cdn.server.com/someapp.css?13456" id="link2">
    </head>
    <body>
        <video poster="http://some.domain.name/someposter.png" src="http://some.domain.name/somevideo.mpeg" id="video1"></video>
        <img src="http://some.domain.name/assets/someimage.jpg" alt="image" id="img1"/>
        <script resource="" src="http://some.domain.name/js/someapp.js" id="script1"></script>
    </body>
</html>`;
