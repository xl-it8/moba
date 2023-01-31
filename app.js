const express = require('express')
var { expressjwt: jwt } = require("express-jwt");
const multer = require("multer");
const config = require('./config/index')
// const history = require('connect-history-api-fallback')

// app.get('/admin', function (req, res) {
//     res.sendFile(__dirname, "web/index.html")
// });

require('./dataBase/db') //创建与数据库连接
const app = express()
// app.use(history());
app.use(express.json()) //解析json
app.use(express.urlencoded({ extended: false }))//解析params
app.use('/', express.static('./web'))//托管静态资源
app.use('/admin', express.static('./admin'))//托管静态资源 //静态资源压缩 compression gzip
app.use(express.static('./file'))//托管静态资源
app.use(require('cors')()) //解决跨域

//处理jwt Token
app.use(
    jwt({ secret: config.secret, algorithms: ["HS256"] }).unless({ path: [/^\/web\//, /^\/admin\//] })
)
const webRouter = require('./router/list')
app.use('/web/api', webRouter)

const categoryRouter = require('./router/category')
app.use('/:resource', (req, res, next) => {
    const moduleName = req.params.resource
    // console.log(moduleName)
    req.module = require(`./module/${moduleName}`)
    next()
}, categoryRouter) //注册路由级别中间件

const loginRouter = require('./router/login')
app.use('/admin', loginRouter)



// require('./web/list')(app) //另一种写法?



//错误级别中间件必须是四个参数 err, req, res, next 否则不起作用
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: err.message })
    }
    if (err instanceof multer.MulterError) {
        res.status(412).send({ message: err.message })
    }
    res.status(500).send(err)
})

app.listen('803', () => {
    console.log('http://127.0.0.1:803')
})