import chalk from "chalk"
import dayjs from "dayjs"
import os from "os"
import rmrf from "rmrf";
import trash from "trash";

/**
 * 获取时间
 * @param format string
 * @param color boolean
 */
export function getTime(format = "YYYY-MM-DD HH:mm:ss", color = true): string {
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
  return os.platform() === "darwin"
}

/**
 * 删除文件直垃圾箱或者永久删除
 * @param file string
 * @param force boolean
 */
export async function removeFile(file: string, force = false) {
  let remove: any = async (file) => trash([file])
  if (force) {
    remove = rmrf
  }
  await remove(file)
}
