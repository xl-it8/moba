const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categoriesSchema = new Schema({
    name: String,
    parent: { //要么不传要么传符合类型的id内容
        type: Schema.Types.ObjectId, //ObjectId是数据库的id类型 不能用String 比较特殊
        ref: "categories" //引用的数据id 结合populate使用
    }
})

module.exports = mongoose.model("categories", categoriesSchema)