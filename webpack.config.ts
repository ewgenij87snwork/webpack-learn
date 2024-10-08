import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

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
            isDev && new webpack.ProgressPlugin(),

            // I - for extract css into separate file on build
            // set chunk name and set dir for css
            isProd && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // II - for extract css into separate file on build, we change 'style-loader' to MiniCssExtractPlugin.loader
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ], // 'use' can be single or array and order is important
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
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ],
        },
        devtool: isDev && 'inline-source-map', // for debug errors
        devServer: isDev && {
            port: env.port ?? 4500,
            open: true // for immediately open in browser (on macOs not possible set some specific browser. Will open in default)
        },
    };

    return config;
}