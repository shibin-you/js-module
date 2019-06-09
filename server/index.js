const Koa = require('koa')
const {initRouter} = require('./routes');
const app = new Koa()
console.log(initRouter);
initRouter(app)
app.listen(3000)
