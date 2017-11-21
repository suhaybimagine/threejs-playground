var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let rules = [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
    },
    { test: /\.txt$/, use: 'raw-loader' }
];

if (debug) {

    rules.push({
        test: /\.css$/,
        loader: 'style-loader'
    });

    rules.push({
        test: /\.css$/,
        loader: 'css-loader',
        options: { modules: true  }
    });

} else {

    rules.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: {
                loader: "css-loader",
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        })
    });
}

module.exports = {
    context: __dirname,
    devtool: debug ? "sourcemap" : false,
    entry: "./src/Main.js",
    module: { rules: rules },
    output: {
        path: path.resolve(__dirname, 'dist/release'),
        publicPath: "release",
        filename: 'app.min.js'
    },
    plugins: debug ? [
            new ExtractTextPlugin("styles.css")
        ] : [
            new ExtractTextPlugin("styles.css"),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        ],
    devServer: {
        port: 8081,
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        inline: true
    }
};