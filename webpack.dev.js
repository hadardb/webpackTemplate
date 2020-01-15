/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-13 15:13:36
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-13 15:31:05
 */
const path = require('path')
const { smart } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')

module.exports = smart(base,{
    mode: 'development', // 模式   production  development
    plugins:[
        // 全局变量
        new webpack.DefinePlugin({
            // 内部会进行计算 不能直接写字符串 输入 'production' 会被转义为production 变量
            DEV: JSON.stringify('development'),
        }),
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',  // 强制先执行 该loader     post强制后置 pre前置
                use: [
                    {
                        loader: 'eslint-loader',
                    },
                ]
            },
        ]
    },
    
     //增加源码映射
     devtool: 'source-map',  // 新增一个map文件      'eval-source-map'   写在被映射的文件中
    // 开发服务器的配置
    devServer: {
        port: 3000, // 端口号
        // progress: true, // 进度条
        contentBase: './build',   //运行目录
        compress: true, // 启用gzip压缩 
        // 接口代理
        proxy:{
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite:{'/api': ''}    // 将/api 重写 为空
            }
        },
        // devServer 内置express  before 类似于前置钩子 可以把接口测试 写在这个里
        before(app){
            app.get('./user',(req,res)=>{
                res.json({})
            })
        }
    },
    
})