import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number
}

export default(env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
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
        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        // tells Webpack where to output the bundle it creates and how to name it.
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js', //[name] -- use standard name (main), [contenthash] -- add random symbols to prevent browser cashing
            clean: true //remove previous/old bundle
        },

        plugins: [
            // adds the built script to index.html on build
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),

            // show % of progress. But can slow down creating build in Production
            isDev && new webpack.ProgressPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"], // 'use' can be single or array
                },
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
        devtool: isDev && 'inline-source-map', // for debug errors
        devServer: isDev && {
            port: env.port ?? 4500,
            open: true // for immediately open in browser (on macOs not possible set some specific browser. Will open in default)
        },
    };

    return config;
}