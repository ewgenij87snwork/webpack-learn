// for proper splicing of the paths
const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
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
        entry: path.resolve(__dirname, 'src', 'index.ts'),

        // tells Webpack where to output the bundle it creates and how to name it.
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js', //[name] -- use standard name (main), [contenthash] -- add random symbols to prevent browser cashing
            clean: true //remove previous/old bundle
        },

        plugins: [
            // adds the built script to index.html on build
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // what files processing
                    use: 'ts-loader', // name of loader
                    exclude: /node_modules/, // what we NOT processing
                },
            ],
        },

        /*
        to prevent writing file extension
        example: import { Component } from './Component'
        */
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
}