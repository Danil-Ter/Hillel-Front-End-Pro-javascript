import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: "development",
    entry: ['./front/main.js', './front/style.css'],
    output: {
        path: resolve(__dirname, "./dist/front"),
        filename: "main.js"
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./front/index.html"),
            filename: "index.html",
            minify: true
        }),
	new MiniCssExtractPlugin({
            filename: "[name].css",
        })
        
        // UglifyJsPlugin
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
            
        ],
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        compress: true,
        port: 4200,
        liveReload: true,
        hot: false 
    },
}
