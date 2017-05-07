var path=require('path')
var webpack=require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 指定spa应用的入口文件
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
        vendors: ['react','react-dom','react-router']

    },
    // 指定项目构建的输出位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 为了做代码的异步加载
        publicPath:'/',
        // 分块名称设置
        chunkFilename: '[name]_[chunkhash:8]_chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // 2、处理在js中引用css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader"
                })
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader!sass-loader"
                })
            },
            // 处理在js中引用less文件
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader!less-loader"
                })
            },
            // 处理图片操作
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=2500&name=images/[name].[ext]'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=1000&name=fonts/[name].[ext]'
            }
        ]
    },


    plugins: [
        // 删除文件夹的插件
        new CleanPlugin(['dist']),
        // 分离第三方应用的插件
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 抽取样式文件的插件
        new ExtractTextPlugin("app.css"),
        // 自动生成html插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 压缩混淆js代码插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        // 在构建的过程中删除警告
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        })
    ]
}