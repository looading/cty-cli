import chalk from "chalk";
import { Arguments } from "yargs"
import cleanVscodeOnMacOS from "../lib/cleanVscode";
import { isMacOS } from "../utils";
export const command = "cleanVscode"
export const desc = "cleanup vscode on MacOS"

export const builder = {
  force: {
    default: false,
    boplean: true,
    desc: "remove files forever",
    aliases: "f",
  },
}

interface IArgument {
  force?: boolean
}

export const handler = async (argv: Arguments<IArgument>) => {
  const { force } = argv
  if (isMacOS()) {
    await cleanVscodeOnMacOS(force)
  } else {
    console.log(chalk`{redBright This command only be supported on MacOS.}`)
  }
}
