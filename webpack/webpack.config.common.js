/**
 * Dependencies
 */

// Third-Parties Dependencies
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const path = require('path')
const glob = require('glob')

/**
 * VARIABLES
 */
const BASE_DIR = path.resolve(__dirname, '..')

/**
 * FUNCTIONS
 */

/**
 * Get entries files
 * @return {object}
 */

const getEntryFiles = () => {
    let entries = {}

    // Get all Javascript Files and Subfiles in 'src/app' folder
    glob.sync(path.join(BASE_DIR, 'src/app/**/*.js')).forEach(pathname => {
        const name = path.basename(pathname, ".js")
        entries[name] = pathname
    })

    // Get all CSS Files and Subfiles in 'src/styles' folder
    glob.sync(path.join(BASE_DIR, "src/styles/**/*.scss")).forEach(pathname => {
        const name = path.basename(pathname, ".scss")
        entries[name] = pathname
    })

    return entries
}

// Module to export
module.exports = {
    entry: getEntryFiles(),
    output: {
        path: path.join(BASE_DIR, 'public'),
        filename: 'js/[name].js',
        clean: true,
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                        ]
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.s?(a|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader", 
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(BASE_DIR, 'src/assets/'), to: path.join(BASE_DIR, 'public/assets/') },
                { from: path.join(BASE_DIR, 'src/pages'), to: path.join(BASE_DIR, 'templates/')}
            ]
        })
    ]
}