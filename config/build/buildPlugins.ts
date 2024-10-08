import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins(): Configuration['plugins'] {
    return [
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
    ].filter(Boolean)
}