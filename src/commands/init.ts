import { createDefaultConfig } from '../lib/config'

export const command = 'init'

export const desc = 'init config'

export const handler = () => {
  createDefaultConfig()
}
