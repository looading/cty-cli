import fs from 'fs'
import path from 'path'
import { cosmiconfigSync } from 'cosmiconfig'
import { configName, defaultConfig } from './constants'
import { IPlugin } from './plugin'
import { debugLog, log, warn } from '../utils'

export type TConfigPlugin = string | IPlugin<any>

export interface IConfig {
  plugins: TConfigPlugin[]
}

export const getConfig = (): {
  data: IConfig
  file: string
} => {
  const explorerSync = cosmiconfigSync(configName)

  debugLog('获取配置文件')
  const res = explorerSync.search(process.cwd())
  if (!res || res.isEmpty) {
    warn('Please run command init first.')
    return {
      data: defaultConfig,
      file: process.cwd()
    }
  }
  debugLog('配置信息', res?.config)

  return {
    data: res.config,
    file: res.filepath
  }
}

export const createDefaultConfig = () => {
  const file = path.resolve(process.cwd(), `${configName}.config.js`)
  if(!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      `module.exports = ${JSON.stringify(defaultConfig, null, 2)}`,
      {
        encoding: 'utf8'
      }
    )
  }

  log('成功创建配置文件.')
}