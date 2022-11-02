/**
 * Dependencies
 */

// Third-Parties Dependencies
const { merge } = require('webpack-merge')

// Node Dependencies
const path = require('path')

// local Dependencies
const config = require('./webpack.config.common')

/**
 * VARIABLES
 */
 const BASE_DIR = path.resolve(__dirname, '..')

// Merge commun config to dev and exports
module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        static: {
            directory: path.join(BASE_DIR, 'public')
        },
        devMiddleware: {
            writeToDisk: true
        },
        watchFiles: [
            path.join(BASE_DIR, 'templates/**/*.html')
        ]
    }
})