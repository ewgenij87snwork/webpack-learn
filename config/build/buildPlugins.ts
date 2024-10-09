import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./type/type";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        // adds the built script to index.html on build
        new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }),
    ]

    if (isDev) {
        // show % of progress. But can slow down creating build in Production
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin())

    }

    if (isProd) {
        // I - for extract css into separate file on build
        // set chunk name and set dir for css
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        );
        // for translates files and other files, that should be copy to built
        plugins.push(    new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public, 'locales'),
                    to: path.resolve(paths.output, 'locales')
                }
            ],
        }))
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}