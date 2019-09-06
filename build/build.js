'use strict'
require('./check-versions')()//检查node+npm的版本，引用./check-versions.js文件

process.env.NODE_ENV = 'production'//打包之后的用户环境

const ora = require('ora')//导入ora模块 实现loading效果

//导入rimraf模块 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件是否为空
const rm = require('rimraf')

const path = require('path')
const chalk = require('chalk')//导入chalk模块 用来改变文字颜色
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')//实现loading的模块
spinner.start()//开始动画


//rm方法删除static文件夹
//path.join是将路径片段以'\'连接成新的路径，任何一个路径片段有错误就会报错
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //构建webpack
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()//停止动画
    if (err) throw err
    //process.stdout.write是标准输出，相当于console.log
    process.stdout.write(stats.toString({
      colors: true,//增加控制卡颜色开关，即显示不同颜色的字体
      modules: false,//是否增加内置模块信息
      children: false,

      chunks: false,//允许较少的输出
      chunkModules: false//不将内置模块的信息加到包信息
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      //执行失败
      process.exit(1)
    }
    //编译退出
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
