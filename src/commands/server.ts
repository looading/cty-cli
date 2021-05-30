import { createServer } from 'http-server'

export const command = "server"

export const desc = "http server"

interface IArgument {
  root: string
  port: boolean
  cors: boolean
}

export const builder = {
  root: {
    default: process.cwd(),
    boolean: true,
    desc: "root directory",
  },
  port: {
    default: 8080,
    boolean: true,
    desc: "port",
    alias: 'p'
  },
  cors: {
    default: true,
    boolean: true,
    desc: "cors",
  }
}
export const handler = (args: IArgument) => {
  const { root, port, cors } = args
  const server = createServer({
    root,
    cors
  })

  server.listen(port, () => {
    console.log(`server is running on port: ${port},\nhttp://127.0.0.1:${port}`)
  })

  process.on('exit', () => {
    server.close()
  })
}
