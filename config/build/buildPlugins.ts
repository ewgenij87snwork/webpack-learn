import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./type/type";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        // adds the built script to index.html on build
        new HtmlWebpackPlugin({ template: paths.html }),
    ]

    if (isDev) {
        // show % of progress. But can slow down creating build in Production
        plugins.push(new webpack.ProgressPlugin())
    }

    if (isProd) {
        // I - for extract css into separate file on build
        // set chunk name and set dir for css
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        )
    }
    return plugins;
}