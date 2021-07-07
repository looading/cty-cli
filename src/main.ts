#!/usr/bin/env node

import chalk from 'chalk'
import path from 'path'
import yargs from 'yargs'
import { loadPlugins } from './lib/plugin'
import { debugLog } from './utils'


// tslint:disable-next-line:no-unused-expression
yargs
  .commandDir(path.resolve(__dirname, 'commands'))

const plugins = loadPlugins()
plugins.forEach(p => {
  const commands = p.registerCommands()
  Object.entries(commands).forEach(([name, command]) => {
    debugLog(`register command plugin:${name}`, command)
    const ret = yargs.command({
      ...command,
      describe: chalk`{yellowBright [plugin:${p.name}]} ${command.describe}`
    })
    if(command.aliases) {
      ret.alias(command.aliases, command.command)
    }
  })

})

yargs.demandCommand()
  .help()
  .argv

