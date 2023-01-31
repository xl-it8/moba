const mongoose = require('mongoose');
const Schema = mongoose.Schema //获取校验的函数对象
//英雄模块的定义

const heroSchema = new Schema({
    name: String,
    items: [{
        image: { type: String },
        url: { type: String }
    }], //为什么是数组因为可能一个英雄有多个分类
})

module.exports = mongoose.model("ad", heroSchema)  