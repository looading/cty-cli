import { cphost } from "../lib/cphost";

export const command = "cphost"

export const desc = "copy ipv4"

export const handler = () => {
  cphost()
}
