const mongoose = require('mongoose');
const Schema = mongoose.Schema
//英雄模块的定义

const heroSchema = new Schema({
    name: String,
    avatar: String,
    banner: String,
    title: String, //英雄标题
    categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }], //为什么是数组因为可能一个英雄有多个分类
    scopes: {
        difficult: { type: Number },
        skills: { type: Number },
        attach: { type: Number },
        dead: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
    }],
    items1: [{ type: Schema.Types.ObjectId, ref: 'items' }], //从物品分类哪里获取相关信息
    items2: [{ type: Schema.Types.ObjectId, ref: 'items' }],
    useTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: Schema.Types.ObjectId, ref: 'hero' },
        description: { type: String },
    }]

})

module.exports = mongoose.model("hero", heroSchema,'heroes')  