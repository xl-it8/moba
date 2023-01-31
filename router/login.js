const express = require('express');
const bcrypt = require('bcrypt')
// const assert = require('http-assert')
const config = require('../config/index')
const router = express.Router()

//登录接口
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const result = await require('../module/admin').findOne({ username }).select('+password')  //.select('+password')  原因是因为之前在admin表中设置了select:false 返回的数据是不会有密码  加了这一句就强制获取密码 -password就是移除密码
    // console.log(result)
    // console.log(result + '--') 如果没有从数据库中找到数据 返回null
    if (!result) {
        res.status(421).send({ //res.status(421)设置网络的状态码 在网络控制台可以看到
            message: '用户名不存在'
        })
        return
    }
    //对比密码
    //如果是错误的会抛出错误到 错误级别中间件
    const isSame = bcrypt.compareSync(password, result.password)
    if (!isSame) {
        res.status(421).send({ //res.status(421)设置网络的状态码 在网络控制台可以看到
            message: '密码输入出错'
        })
     return
    }

    //都符合 返回处理的同一用户的token  jsonwebtoken包
    const jwt = require('jsonwebtoken')
    var tokenStr = jwt.sign({ username: result.username }, config.secret, { expiresIn: config.expiresIn })
    res.status(200).send({ token: 'Bearer ' + tokenStr })
})

module.exports = router