// for proper splicing of the paths
const path = require('path');

module.exports = (env) => {
    return {
        /* mode
        in package.json we put 'env':
          "scripts": {
            "build:dev": "webpack --env mode=development",
            "build:prod": "webpack --env mode=production"
          },
        * */
        mode: env.mode ?? 'development', //'development'  - with comments, line breaks; 'production' -- minified

        // "entry" -- where Webpack starts building app
        // for proper splicing of the paths
        entry: path.resolve(__dirname, 'src', 'index.js'),

        // tells Webpack where to output the bundle it creates and how to name it.
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js', //[name] -- use standard name (main), [contenthash] -- add random symbols to prevent browser cashing
            clean: true //remove previous/old bundle
        }
    }
}