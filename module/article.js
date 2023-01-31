const mongoose = require('mongoose');
const Schema = mongoose.Schema
//英雄模块的定义

const heroSchema = new Schema({
    title: String,
    detail: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }], //为什么是数组因为可能一个英雄有多个分类
}, {
    timestamps: true  //随机生成创建时间 
})

module.exports = mongoose.model("article", heroSchema)  