import chalk from "chalk";
import clipboard from "clipboardy"
import os from "os"

export function getIPv4() {
  const networks = os.networkInterfaces()
  if (networks.en0) {
    const network = networks.en0.filter((network) => network.family === "IPv4").map((network) => network.address)
    return !network.length ? "" : network[0]
  } else {
    return ""
  }
}

export function cphost() {
  const ipv4 = getIPv4()
  clipboard.writeSync(ipv4)
  console.log(chalk`{cyanBright IP Address: {greenBright ${ipv4}}}`)
}
