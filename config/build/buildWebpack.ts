import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(option: webpack.Configuration) {
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
        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        // tells Webpack where to output the bundle it creates and how to name it.
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js', //[name] -- use standard name (main), [contenthash] -- add random symbols to prevent browser cashing
            clean: true //remove previous/old bundle
        },

        plugins: buildPlugins(),
        module: {
            rules: buildLoaders()
        },

        /*
        to prevent writing file extension
        example: import { Component } from './Component'
        */
        resolve: buildResolvers(),
        devtool: isDev && 'inline-source-map', // for debug errors
        devServer: isDev ? buildDevServer() : undefined,
    };
}