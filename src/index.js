/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-12 12:22:13
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-13 13:32:28
 */
let str = require('./a.js')
require("@babel/polyfill");
require('./index.css')
require('./myclass.scss');
import myimg from './index.png'
let moudleImg = require('./index.png')  // require进来的会是一个模块
// import $ from 'expose-loader?$!jquery'      //内联暴露全局变量
// import $ from 'jquery'

let image = new Image();
console.log(myimg)
image.src = myimg
console.log(image)
document.body.appendChild(image)

console.log($)
console.log(window.$)
let fn = ()=>{
    console.log([].fill(8))
    console.log(1423 + str)
}
fn()

function * gen(params){
    yield 1
}
console.log(gen().next())