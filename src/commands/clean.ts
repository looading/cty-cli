import chalk from "chalk"
import pretty from "pretty-bytes"
import { Arguments, Argv } from "yargs";
import clean from "../lib/clean";

export const command = "clean"

export const desc = ""

export const builder = (yargs: Argv) => yargs.options({
  force: {
    desc: "Delete the Directory instead of putting them in the trash",
    boolean: true,
    default: false,
    alias: "f",
  },
  directroy: {
    desc: "The Directory which should be deleted",
    string: true,
    default: "node_modules",
    alias: "d",
  },
})

interface IArgv {
  force?: boolean
  directroy?: string
}

export const handler = async (argv: Arguments<IArgv>) => {
  const { force, directroy } = argv
  console.log(directroy)
  const total = await clean(process.cwd(), directroy, force)
  console.log(chalk`{cyanBright \nFree space: ${pretty(total, { signed: true })}}`)
}
