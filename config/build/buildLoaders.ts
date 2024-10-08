import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {ModuleOptions} from 'webpack';

export function buildLoaders(): ModuleOptions['rules'] {
    return [
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
    ];
}