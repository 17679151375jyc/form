'use strict'
const merge = require('webpack-merge')//引入webpack-merge模块
/* 这个模块的作用是来合并两个配置文件对象并生成一个新的配置文件，
有点儿类似于es6的object.assign() */

const prodEnv = require('./prod.env')//引入prod.env.js

module.exports = merge(prodEnv, {//合并环境变量
  NODE_ENV: '"development"'
})
