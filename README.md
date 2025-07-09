# webpack-template
This is a basic project template, containing:
* configuration files for both development and distribution
* HTML and CSS handlers
* Image handler for formats: png, svg, jpg|jpeg|gif
* Custom script for the commands
* Webpack modes for development and production

Commands to run:
* npm init -y
* npm install --save-dev webpack webpack-cli
* npm install --save-dev html-webpack-plugin
* npm install --save-dev style-loader css-loader
* npm install --save-dev html-loader
* npm install --save-dev webpack-dev-server

Custom Scripts to be added to package.json:
* "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --config webpack.dev.js",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  },

Note: use npm run [command]
Note 2: "deploy" assumes git branch "gh-pages"

Based on:
* https://www.theodinproject.com/lessons/javascript-webpack
* https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack
