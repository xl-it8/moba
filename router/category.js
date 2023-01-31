const express = require('express');
const router = express.Router({
    mergeParams: true  //合并参数之后才能传递给每一个子路由
})

//新建分类名称
router.post('/create', async (req, res) => {
    const result = await req.module.create(req.body)
    res.send(result)
})

//查询分类列表
router.get('/list', async (req, res) => {
    const options = {}
    let result;
    if (req.module.modelName === 'categories') { //表的模块名
        options.populate = 'parent'
    }
    result = await req.module.find().setOptions(options).limit(1000)
    if (req.query.isOnlyParent === 'true') {
        result = result.filter(item => !item.parent)
    }
    res.send(result)
})

//查询对应id的分类数据
router.get('/list/:id', async (req, res) => {
    const result = await req.module.findById(req.params.id)
    res.send(result)
})
//根据对应的id修改分类名称
router.put('/edit', async (req, res) => {
    const result = await req.module.findByIdAndUpdate(req.body._id, req.body)  //通过指定id找到对应数据并修改指定的字段值 第二个参数是对象
    res.send(result)
})

//根据对应的id删除分类名称
router.delete('/delete/:id', async (req, res) => {
    await req.module.findByIdAndDelete(req.params.id)  //通过指定id找到对应数据并修改指定的字段值 第二个参数是对象
    res.send({
        message: '删除成功'
    })
})

const path = require("path");
const multer = require("multer");
// //存储在uploads文件夹下面，没有会直接创建
// 设置保存路径和文件名
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // 设置文件存储路径
    cb(null, "./file");
  },
  filename: function (req, file, cb) {
    // 设置文件名
    // Math.round(Math.random() *1E9)是生成一个整数部分9位数的随机数，再取整
    let fileData =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + fileData);
  },
});
let upload = multer({
  storage: storage,
});
router.post('/upload', upload.single("file"), (req, res) => {
  res.send({
    status: 200,
    message: 'http://localhost:803/'+ req.file.filename,
  });
});

module.exports = router