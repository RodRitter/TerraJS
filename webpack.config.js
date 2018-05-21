var webpack = require("webpack");

module.exports = {
    entry: __dirname + "/src/terra.js",
    mode: "development",
    devtool: 'source-map',
    output: {
        path: __dirname + "/dist",
        filename: "terra.js"
    },
    devServer: {
        inline: true,
        contentBase: __dirname + "/dist",
        port: 3000
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: ["babel-loader"]
        }]
    }
}