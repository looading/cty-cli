import chalk from "chalk";
import { removeFile } from "../utils";

const fileList = [
  "~/Library/Preferences/com.microsoft.VSCode.helper.plist",
  "~/Library/Preferences/com.microsoft.VSCode.plist",
  "~/Library/Caches/com.microsoft.VSCode",
  "~/Library/Application\ Support/Code/",
  "~/Library/Saved\ Application\ State/com.microsoft.VSCode.savedState/",
  "~/.vscode/",
]

export default async function cleanVscodeOnMacOS(force = false) {
  for (const file of fileList) {
    await removeFile(file, force)
    console.log(chalk`{greenBright rm ${file} success}`)
  }
}
