'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    autoOpenBrowser: true,//自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {},

    host: '172.31.1.228',   //开启项目用到的本地IP
    port: 8080,    //开启项目用到的端口

 
    errorOverlay: true, //查询错误
    notifyOnErrors: true, //通知错误
    poll: false,  //跟devserver相关的一个配置

    useEslint: true,  //是否使用eslint
    showEslintErrorsInOverlay: false, //是否展示eslint的错误提示


    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    //一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，默认在开发环境下为true
    cacheBusting: true,

    cssSourceMap: true//是否开启cssSourceMap
  },

  build: {
    
    index: path.resolve(__dirname, '../FrontShow/index.html'),//打包出来的主页面
    assetsRoot: path.resolve(__dirname, '../FrontShow'),//打包出来的文件夹名
    assetsSubDirectory: 'static',//存放css文件及js文件的文件夹名

    //打包路径，只能在服务器打开，直接打开为空白
    // assetsPublicPath: '/',

    // 直接打开的话改成这个
    assetsPublicPath: './',


    productionSourceMap: false,//打包是否需要map
    devtool: '#source-map',

    //是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,

    productionGzipExtensions: ['js', 'css'],//定义要压缩哪些类型的文件
    
     // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
