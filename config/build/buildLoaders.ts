import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from 'webpack';
import { BuildOptions } from "./type/type";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // II - for extract css into separate file on build, we change 'style-loader' to MiniCssExtractPlugin.loader
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ], // 'use' can be single or array and order is important
    };

    const tsLoader = {
        test: /\.tsx?$/, // what files processing
        use: 'ts-loader', // name of loader
        exclude: /node_modules/, // what we NOT processing
    };

    return [
        scssLoader,
        tsLoader
    ];
}