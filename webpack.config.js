var path = require("path");

var webpack=require("webpack");

var htmlwp=require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "build.js",
    },
    resolve:{
        alias:{
            "jquery":"jquery"
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.(png|jpg|gif|woff|ttf|eot|svg)$/,
            loader: "url-loader"
        },{
            test:/\.vue$/,
            loader:'vue-loader'
        }]
    },
    plugins:[
        new htmlwp({
            filename:'index.html',
            template:'index.html'
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ]
}
