import { createServer } from 'http-server'

export const command = "server"

export const desc = "http server"


interface IArgument {
  root: string
  port: boolean
}

export const builder = {
  root: {
    default: process.cwd(),
    boplean: true,
    desc: "root directory",
  },
  port: {
    default: 8080,
    boplean: true,
    desc: "port",
    alias: 'p'
  }
}
export const handler = (args: IArgument) => {
  const { root, port } = args
  const server = createServer({
    root
  })

  server.listen(port, () => {
    console.log(`server is running on port: ${port},\nhttp://127.0.0.1:${port}`)
  })

  process.on('exit', () => {
    server.close()
  })
}
