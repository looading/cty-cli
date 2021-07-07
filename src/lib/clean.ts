
import chalk from 'chalk'
import du from 'du'
import fs from 'fs'
import path from 'path'
import pretty from 'pretty-bytes'
import util from 'util'
import { getTime, removeFile } from '../utils'

export const duPromisify = util.promisify<string, number>(du)

/**
 * remove {directory} from {dir} to trash or forever
 * @param dir string
 * @param directory string
 * @param force boolean
 */
export default async function clean(dir, directory = 'node_modules', force = false) {
  const dirs = fs.readdirSync(dir)

  let size = 0

  if (~dirs.indexOf(directory)) {
    const f = path.resolve(dir, directory)
    const stat = fs.lstatSync(f)
    if (stat.isSymbolicLink()) { return size }
    console.log(chalk`${getTime()} {grey rm ${f}}`)
    let currentSize = 0
    try {
      currentSize = await duPromisify(f)
    } catch (err) {
      console.log(chalk`{redBright getSize error ${f}`)
    }
    await removeFile(f, force)
    size += currentSize

    console.log(chalk`${getTime()} {cyanBright ${pretty(currentSize, { signed: true })}} {greenBright rm ${f} success}`)
  }

  for (const child of dirs.filter((child) => child !== directory)) {
    if (!fs.existsSync(path.resolve(dir, child))) { return size }
    const stat = fs.lstatSync(path.resolve(dir, child))
    if (stat.isDirectory() && (!stat.isSymbolicLink())) {
      size += await clean(path.resolve(dir, child), directory, force)
    }
  }
  return size
}
