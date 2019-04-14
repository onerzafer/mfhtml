# mfhtml
None breaking extension to html for microfe!!!
## Purpose
microfe is a server side focused meta framework for micro frontends. To function properly, microfe should be able to merge html strings and  it should know how to do it. For that reason it requires a manifest file which is not convinient. Instead of manifest files extending html slightly can provide a way to the developers build sophisticated merge, extend and include rules within the html. This will make their life easier when maintainig their apps.

For these reasons mfhtml is designed as a language extention to html and this project is its runtime.

This dedicated runtime implementation also creates lots of possibilities like proper developer tools to achive having independent development environments.

The difference between ESI and mfhtml is the flexibility of usage. ESI has only include option which is quite enough for most of the cases. This means it has a top down approach and has no option for extending a layout when needed so a developer needs to createa new layout for each possibility. This lowers down the run time complexity but comes with a maintenance overhead.

## Features
There are two major functionalities of mfhtml to empower the development process and microfe funtionality.

### Import
Import feature provides a way to import an html resource with all its js, css and assets. By that way from html resource A a developer import html resource B and reuse it as much as necessary.

```html
<!--- HTML Resource A -->
<html lang="en">
    <head>
        <meta import="HTMLResourceB">
        <meta export="HTMLResourceA">
    </head>
    <body>
        <fragment name="HTMLResourceB"></fragment>
        Hello World
    </body>
</html>
```

```html
<!--- HTML Resource B -->
<html lang="en">
    <head>
        <meta export="HTMLResourceB">
    </head>
    <body>
        Greetings,
    </body>
</html>
```

The result of mfhtml runtime when HTMLResourceA requested will look like as below


```html
<!--- HTML Resource A -->
<html lang="en">
    <head>
        <meta export="HTMLResourceA">
    </head>
    <body>
        <htmlresourceB>Greetings,</htmlresourceB>
        Hello World
    </body>
</html>
```

### Extend
Extend is the biggest difference of mfhtml than ESI and the purpose of ability to extend is separating the concerns of bussiness and UI. Let say an html is responsible from only layout and the other one is implmeneting a business feature. In this case focusing on only the bussiness layer would be beneficial. So the layout can e extended and the details of layout will be hidden away from the bussiness logic. Mainly an HTML resource A can extned the HTML resource B.

```html
<html lang="en">
    <head>
        <meta export="HTMLResourceA" extends="HTMLResourceB">
    </head>
    <body>
        <div override="content-area"><div>Content Override</div></div>
    </body>
</html>
```

```html
<html lang="en">
    <head>
        <meta export="HTMLResourceB">
    </head>
    <body>
        <div public="content-area">Content</div>
    </body>
</html>
```

The output from mfhtml when HTMLResourceA requested as follows

```html
<html lang="en">
    <head>
        <meta export="HTMLResourceA">
    </head>
    <body>
        <content-area><div>Content Override</div></content-area>
    </body>
</html>
```
