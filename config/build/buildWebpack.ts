import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./type/type";

export function buildWebpack(options: BuildOptions) {
const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        /* mode
        in package.json we put 'env':
          "scripts": {
            "build:dev": "webpack --env mode=development",
            "build:prod": "webpack --env mode=production"
          },
        * */
        mode: mode ?? 'development', //'development'  - with comments, line breaks; 'production' -- minified

        // "entry" -- where Webpack starts building app
        // for proper splicing of the paths
        entry: paths.entry,

        // tells Webpack where to output the bundle it creates and how to name it.
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js', //[name] -- use standard name (main), [contenthash] -- add random symbols to prevent browser cashing
            clean: true //remove previous/old bundle
        },

        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },

        /*
        to prevent writing file extension
        example: import { Component } from './Component'
        */
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map', // for debug errors
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}