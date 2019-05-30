const Koa = require('koa')
const serve = require('koa-static')
const webpack = require('webpack')
const config = require('./webpack.base.js')
const koaWebpack = require('koa-webpack')
const {
  resolve
} = require('path')

const app = new Koa()
const port = process.env.PORT || 80

async function start() {
  const compiler = webpack(config);
  try {
    const middleware = await koaWebpack({
      compiler
    })
    app.use(middleware)
    app.use(serve(resolve(__dirname, '../public')))
    app.listen(port,()=>{
      console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)

    })
  } catch (e) {
    console.log(e)
  }
}
start()
