const Router = require('koa-router')
const router = new Router()
router.get('/', (ctx, next) => {
  ctx.body = 'helloword'
})

function initRouter(app) {
  app.use(router.routes())
    .use(router.allowedMethods())
}

module.exports={
  initRouter
}
