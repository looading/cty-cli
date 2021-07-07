import { Arguments } from 'yargs'
import path from 'path'
import { getConfig } from './config'
import { debugLog, error, warn } from '../utils'

interface ICommandConfig<IArgument extends Record<string, any> = Record<string, any>> {
  command: string,
  handler: (argv: Arguments<IArgument>) => Promise<any>
  describe: string
  aliases?: ReadonlyArray<string> | string
  showInHelp?: boolean
  builder: Record<keyof IArgument, {
    default: any
    boolean: boolean
    desc: string
    alias?: string
  }>
}

type ICommands<ICommandArgv extends Record<string, Record<string, any>>> = {
  [C in keyof ICommandArgv]: ICommandConfig<ICommandArgv[C]>
}

export interface IPlugin<ICommandArgv extends Record<string, Record<string, any>>> {
  name: string
  registerCommands(): ICommands<ICommandArgv>

  verifyConfigArgv?: (argv: any) => Partial<ICommandArgv>
}

export const checkPlugin = plugin => {

  if (typeof plugin === 'object') {
    if (plugin.name && plugin.registerCommands) {
      return true
    }
  }
  return false
}

const plugins: IPlugin<any>[] = []

export const loadPlugins = () => {
  debugLog('loadPlugins')
  const config = getConfig()
  config.data.plugins.map(plugin => {
    let mod: IPlugin<any>
    if (typeof plugin === 'string') {

      const modulePath = /^\./.test(plugin) ? path.resolve(path.dirname(config.file), plugin) : plugin

      debugLog('plugin path', modulePath)

      const ret = require(modulePath)
      
      const parsedModule = ret.default ?? ret

      debugLog('get plugin', parsedModule)
      if (!checkPlugin(parsedModule)) {
        warn(`${plugin} 不是一个有效的 plugin`)
        return
      }
      mod = parsedModule
    } else {
      mod = plugin
    }

    if (!checkPlugin(mod)) {
      warn(`${plugin} 不是一个有效的 plugin`)
      return
    }

    debugLog('load plugin', mod.name)

    if (plugins.find(p => p.name === mod.name)) {
      return error('plugin already loaded', mod.name)
    }

    plugins.push(mod)
  })

  return plugins
}

