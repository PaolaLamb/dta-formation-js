const path = require('path');

module.exports = {
    entry: "./app",
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "bundle.js",
    },

    devServer: {
        contentBase: path.join(__dirname, "app"),
        compress: true,
        port: 9000,
        historyApiFallback: true
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: [
                    ['env', {
                        modules: false,
                        targets: {
                            browsers: ["last 2 versions"]
                        }
                    }]
                ]
            }
        }]
    }
}