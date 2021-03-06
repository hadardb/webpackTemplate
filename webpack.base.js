/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-12 12:31:36
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-13 15:47:58
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')   // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');    // 压缩js
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

// bannerPlugin  // 内置 为js添加共同头部注释

module.exports = {
    entry: './src/index.js',    //入口
    output: {
        filename: 'bundle.[hash:8].js',  // 构建后的名称
        path: path.resolve(__dirname, 'dist'),    // 路径必须是绝对路径
        publicPath: 'http://localhost:3000/', // 静态路径前缀  会对所有打包资源添加  如需对单独资源添加 在对应loader下添加publicPath
    },
    // 不需要打包的模块配置
    // externals: {
    //     jquery: '$'
    // },

    // 插件 
    plugins: [   // 存放插件
        
        new HtmlWebpackPlugin({
            template: './src/index.html',   //入口
            filename: 'index.html', // 出口名称
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true // 折叠空行
            },
            hash: true // 添加hash戳
        }),
        // 打包css
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        // 给模块传递全局变量
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // 清空目录
        new CleanWebpackPlugin(),

        // 指定引入的依赖补引入某些用不到的子依赖，以减小整体资源大小
        new webpack.IgnorePlugin(),
        
        // 拷贝文件
        // new copyWebpackPlugin([
        //     {from:'mock',to:'./mock'}
        // ])
    ],
    // 模块
    module: {
        // 不去解析包中的依赖关系
        noParse: /jquery/,
        rules: [ // 规则    从下向上执行
            {
                test: /\.html$/,
                // 只找src下的文件
                include: path.resolve('src'),
                use: {
                    loader: 'html-withimg-loader',
                },

            },
            {
                test: /\.(png|jpg|gif)$/,
                include: path.resolve('src'),
                use: [
                    {// 解析图片资源
                        loader: 'file-loader',
                        options: {
                            esModule: false,    // 配置false 与html-withimg-loader 兼容
                            outputPath: 'img/'  // 设置输出路径
                        }
                    }


                ],
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env/'
                            ],
                            plugins: [
                                "@babel/plugin-transform-runtime"
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve('src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',   // 编译css文件
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve('src'),
                use: [
                    // {
                    //     loader: 'style-loader', // 将css 插入到head中
                    //     options: {
                    //         insert: insertAtTop // 将css插入到head顶部
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',   // 编译css文件
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // {            // 如果require引入， 可以使用该插件变为全局变量
            //     test:require.resolve('jquery'),
            //     use:'expose-loader?$!'
            // },
        ]
    },
    
   
    
    //watch 监听 实时打包
    // watch:true,

    // watch 的配置项
    // watchOptions:{
    //     poll: 1000,  // 多少秒更新一次
    //     aggregateTimeout: 1000, // 防抖 的时间
    //     ignored:/node_modules/,  // 不监听哪个文件
    // },

    

    // 解析第三方包 配置
    resolve:{
        // 省略扩展名  依次解析
        extensions:['.js','.css'],
        // 起别名
        alias:{

        }
    }
}


// 将css插入到head顶部
function insertAtTop(element) {
    var parent = document.querySelector('head');
    // eslint-disable-next-line no-underscore-dangle
    var lastInsertedElement =
        window._lastElementInsertedByStyleLoader;

    if (!lastInsertedElement) {
        parent.insertBefore(element, parent.firstChild);
    } else if (lastInsertedElement.nextSibling) {
        parent.insertBefore(element, lastInsertedElement.nextSibling);
    } else {
        parent.appendChild(element);
    }

    // eslint-disable-next-line no-underscore-dangle
    window._lastElementInsertedByStyleLoader = element;
} 