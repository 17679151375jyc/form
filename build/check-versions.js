'use strict'
//这款插件改变命令行中的字体颜色例：chalk.blue('Hello world')
const chalk = require('chalk')

//semver插件，是用来对特定的版本号做判断semver.gt('1.2.3','9.8.7')
const semver = require('semver')

const packageConfig = require('../package.json')

// 下面这个插件是shelljs，作用是用来执行Unix系统命令
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//使用semver插件
    versionRequirement: packageConfig.engines.node// 这是规定的pakage.json中engines选项的node版本信息
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        //使用chalk插件
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
        // 大致意思就是 把当前版本号用红色字体 符合要求的版本号用绿色字体 给用户提示具体合适的版本
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
