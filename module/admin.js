const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
//英雄模块的定义

const adminSchema = new Schema({
    username: String,
    password: {
        type: String,
        select: false, //用了这个就是对密码处理之后不会从数据库中把密码拿出来
        set(value) { //set 的作用
            //写成函数目的是可以对前端填入的内容个性化处理
            //前端给的密码需要加密处理 利用bcrypt包
            return bcrypt.hashSync(value, 10)
        }
    }
})

module.exports = mongoose.model("admin", adminSchema)  