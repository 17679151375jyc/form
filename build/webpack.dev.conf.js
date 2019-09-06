'use strict'
const utils = require('./utils')//引入utils.js
const webpack = require('webpack')//引入内置模块webpack
const config = require('../config')//引入config.js
const path = require('path')//node的path模块
//进行合并对象，相同项目会进行覆盖
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const HtmlWebpackPlugin = require('html-webpack-plugin')//自动生成HTML的插件，能够把资源自动加载到html文件中

const CopyWebpackPlugin = require('copy-webpack-plugin')//导入copy-webpack-plugin 用来复制

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//收集webpack的错误和日志

const portfinder = require('portfinder')//导入portfinder 用来获取port

const HOST = process.env.HOST//主机
const PORT = process.env.PORT && Number(process.env.PORT)//端口

// 合并
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 解析样式文件的规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,//开发工具
  
    //服务器 如需要请求本地数据时  需要在此块添加其他配置
  devServer: {
    clientLogLevel: 'warning',//重新加载server,控制台以warning方式提示错误
    historyApiFallback: {
      rewrites: [
        // 404页面替换index.html
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,//热替换
    contentBase: false, //告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要，这里是禁用

    compress: true,//是否压缩
    host: HOST || config.dev.host,//主机
    port: PORT || config.dev.port,//端口
    open: config.dev.autoOpenBrowser,//是否自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }//编译出错时是否有提示
      : false,
    publicPath: config.dev.assetsPublicPath,//静态资源路径 此路径可在浏览器中打开

    proxy: config.dev.proxyTable,//代理
    quiet: true, //启用quiet 意思是除了启动信息以外的任何信息都不会打印在控制台
    watchOptions: {
      poll: config.dev.poll,//监视文件的选项
    }
  },
  plugins: [
    //自定义一个plugin 生成当前环境的一个变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), //模块热替换插件 修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), //当开启HMR的时候使用该插件会显示模块的相对路径
    new webpack.NoEmitOnErrorsPlugin(), //在编译出错时 使用NoEmitOnErrorsPlugin来跳过输出阶段 确保输出资源不会包含错误
    new HtmlWebpackPlugin({
      //自动生成html
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        //复制静态资源到开发环境的路径
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

//导出
module.exports = new Promise((resolve, reject) => {  
  portfinder.basePort = process.env.PORT || config.dev.port//获取basePort
  
   //端口配置
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      //添加友好提示 
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({  
        //编译成功提示     
        compilationSuccessInfo: {
          //提示运行的主机和端口
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        // 错误提示
        onErrors: config.dev.notifyOnErrors? utils.createNotifierCallback() : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
