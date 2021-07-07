import chalk from 'chalk'
import dayjs from 'dayjs'
import fs from 'fs'
import os from 'os'
import rmrf from 'rmrf'
import trash from 'trash'

/**
 * 获取时间
 * @param format string
 * @param color boolean
 */
export function getTime(format = 'YYYY-MM-DD HH:mm:ss', color = true): string {
  const dateString = dayjs(Date.now()).format(format)
  if (color) {
    return chalk`{gray [${dateString}]}`
  } else {
    return dateString
  }
}

/**
 * 是否是macos
 */
export function isMacOS() {
  return os.platform() === 'darwin'
}

/**
 * 删除文件直垃圾箱或者永久删除
 * @param file string
 * @param force boolean
 */
export async function removeFile(file: string, force = false) {
  let remove: any = async (file) => trash([file])
  if (force) {
    const stat = fs.statSync(file)
    if(stat.isDirectory()) {
      remove = rmrf
    } else {
      remove = (file: string) => {
        fs.unlinkSync(file)
      }
    }

  }
  await remove(file)
}


export const log = (msg: string, ...arg: any) => {
  console.log(getTime(), chalk`{cyanBright ${msg}}`, ...arg)
}

export const warn = (msg: string, ...arg: any) => {
  console.log(getTime(), chalk`{yellowBright ${msg}}`, ...arg)
}

export const error = (msg: string, ...arg: any) => {
  console.log(getTime(), chalk`{redBright ${msg}}`, ...arg)
}

export const isDebugMode = () => {
  return !!process.env.DEBUG
}

export const debugLog = (msg: string, ...arg: any) => {
  if(!isDebugMode()) return
  console.log(getTime(), chalk`{redBright [${msg}]}`, chalk`{cyanBright ${msg}}`, ...arg)
}