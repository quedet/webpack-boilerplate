/**
 * Dependencies
 */

// Third-Parties Dependencies
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

// Node Dependencies
const path = require('path')

// local Dependencies
const config = require('./webpack.config.common')


// Merge commun config to dev and exports
module.exports = merge(config, {
    mode: 'production',
    target: 'browserslist',
    devtool: 'inline-source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin, new CssMinimizerPlugin, new HtmlMinimizerPlugin
        ]
    }
})