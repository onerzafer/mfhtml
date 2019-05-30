exports.SomeApp = /*html*/ `
<html lang="en">
    <head>
        <meta import="SomeApp1">
        <meta export="SampleApp">
        <title>SomeApp Title</title>
        <link resource href="someapp.css">
    </head>
    <body>
        <fragment name="SomeApp1"></fragment>
        <fragment name="SomeApp2"></fragment>
        <fragment name="SomeApp1"></fragment>
        <fragment name="SomeApp3"></fragment>
        <fragment name="SomeApp1"></fragment>
        <script resource>
            console.log('SomeApp is running');        
        </script>
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
        <div>Some App 1 body</div>
        <script resource src="someapp1.js"></script>
    </body>
</html>`;

exports.Expected = /*html*/ `
<html lang="en">
    <head>
        <meta export="SampleApp">
        <title>SomeApp Title</title>
        <link resource="resource" href="someapp.css">
        <link resource="resource" href="someapp1.css">
    </head>
    <body>
        <someapp1>
            <div>Some App 1 body</div>
        </someapp1>
        <someapp1>
            <div>Some App 1 body</div>
        </someapp1>
        <someapp1>
            <div>Some App 1 body</div>
        </someapp1>
        <script resource="resource">
            console.log('SomeApp is running');        
        </script>
        <script resource="resource" src="someapp.js"></script>
        <script resource="resource" src="someapp1.js"></script>
    </body>
</html>`;
