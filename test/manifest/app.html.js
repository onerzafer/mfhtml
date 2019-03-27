exports.app = /*html*/`
<html lang="en">
    <head>
        <meta import="SomeApp1">
        <meta import="SomeApp2">
        <meta import="SomeApp3">
        <meta export="SampleApp" export-as="/sampleapp/*" extends="ExtendableApp" of-type="page">
        <title override>SomeApp Title</title>
        <link resource src="/some.scss">
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
        <div override="content-area"></div>
        <script resource>
            console.log('SomeApp is running');        
        </script>
        <script resource src="someapp.js"></script>
    </body>
</html>`;
