/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-13 15:13:36
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-13 15:30:55
 */
const path = require('path')
const { smart } = require('webpack-merge')
const base = require('./webpack.base')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')   // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');    // 压缩js
const webpack = require('webpack')

module.exports = smart(base,{
    mode: 'production', // 模式   production  development
    plugins:[
        // 全局变量
        new webpack.DefinePlugin({
            // 内部会进行计算 不能直接写字符串 输入 'production' 会被转义为production 变量
            DEV: JSON.stringify('production'),
        }),
    ],
    // 优化项
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true, // 是否缓存
                parallel: true, // 并行打包
                sourceMap: false, // 源码映射    
            }), // 压缩js
            new OptimizeCSSAssetsPlugin({
                cache: true, // 是否缓存
                parallel: true, // 并行打包
                sourceMap: false, // 源码映射   
            }), //压缩css
        ],
    },
})