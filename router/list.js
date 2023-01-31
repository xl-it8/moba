const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//一下子初始录入多个数据到数据库 实际工作中不会用
router.get('/news/init', async (req, res) => {
    const categories = mongoose.model('categories')
    const article = mongoose.model('article')
    const parent = await categories.findOne({
        name: '新闻分类',
    })
    const categoriesData = await categories
        .find()
        .where({
            parent: parent,
        })
        .lean() //where找到对应的parent数据 lean转为json对象
    const data = [
        '快乐分享，兔年一起团！',
        '蒙犽源·梦皮肤设计大赛创意赏析第五期',
        '蒙犽源·梦皮肤设计大赛创意赏析第四期',
        '蒙犽源·梦皮肤设计大赛创意赏析第三期',
        '《王者荣耀》&amp;《合金弹头：觉醒》梦幻联动福利到丨荣耀水晶、史诗皮肤自选宝箱免费送',
        '1月19日全服不停机更新公告',
        '1月18日暂时屏蔽无限乱斗玩法说明',
        '1月18日全服不停机更新公告',
        '1月17日体验服停机更新公告',
        '1月16日体验服不停机更新公告',
        '“一元福利周”活动开启公告',
        '兔年到，福气满满迎新春！',
        '【蔷薇珍宝阁】活动开启公告',
        '【小兔市集-送史诗皮肤】活动开启公告',
        '王者新春年货节 组队消费赢好礼活动公告',
        '武汉eStar斩获第八冠 2022王者世冠KIC在深圳圆满收官',
        '武汉eStarPro vs 佛山DRG.GK，谁将问鼎世冠总冠军？',
        '王者世冠半决赛落幕：星辰耀世，雄狮觉醒，谁能捧得凤凰杯？',
        '世冠半决赛 | 武汉eStarPro vs 重庆狼队：谁能率先晋级总决赛？',
        '2022王者世冠KIC半决赛即将开启，龙争虎斗，谁能成功进军总决赛？',
    ]
    const newsList = data.map((title) => {
        const randomData = categoriesData
            .slice(0)
            .sort((a, b) => Math.random() - 0.5) //slice(0)拷贝一份 再随机排序
        return {
            categories: randomData.slice(0, 2),
            title: title,
        }
    })

    await article.deleteMany({}) //代表以任意内容删除article中所有数据
    await article.insertMany(newsList) //数组中数据一条一条录入数据表
    res.send(newsList)
})

router.get('/news/list', async (req, res) => {
    const categories = mongoose.model('categories')
    const article = mongoose.model('article')
    const parent = await categories.findOne({
        name: '新闻分类',
    })
    const cats = await categories.aggregate([
        //聚合查询 查询关联数据 灵活 并且随意
        {
            $match: { parent: parent._id }, //相当于where 查找 id数据
        },
        {
            $lookup: {
                from: 'articles', //查询的关联表 名字与模块的名字可能不一样 如果模块名是Article 要变成小写加复数articles
                localField: '_id', //通过本表本模型categories的_id
                foreignField: 'categories', //去articles的表(模型)中的categories查找与_id相等的对应数据 作为newsList的值
                as: 'newsList', //查询后的新字段名设置
            },
        },
        {
            $addFields: {
                //添加字段 如果查询数据有的就是修改
                newsList: { $slice: ['$newsList', 5] }, //修改newsList数据截取出5条数据即可
            },
        },
    ])
    const subCat = cats.map((v) => v._id)
    cats.unshift({
        name: '热门',
        newsList: await article
            .find()
            .where({
                categories: { $in: subCat }, //$in 操作符 $in 运算符用于选择字段值等于数组中任何给定值的文档
            })
            .populate('categories')
            .limit(5)
            .lean(),
    })

    //单独处理热门的name数据
    cats.map((cat) => {
        cat.newsList.map((news) => {
            news.categoryName =
                cat.name === '热门' ? news.categories[0].name : cat.name
            return news
        })
        return cat
    })

    res.send(cats)
})

//初始录入英雄的数据
router.get('/hero/init', async (req, res) => {
    const categories = mongoose.model('categories')
    const heroes = mongoose.model('hero')
    await heroes.deleteMany({})
    const rowData = [
        {
            categoryName: '热门',
            heroes: [
                {
                    name: '马可波罗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg',
                },
                {
                    name: '李信',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
                },
                {
                    name: '瑶',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg',
                },
                {
                    name: '小乔',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg',
                },
                {
                    name: '安琪拉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg',
                },
                {
                    name: '孙悟空',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg',
                },
                {
                    name: '吕布',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg',
                },
                {
                    name: '后羿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg',
                },
                {
                    name: '孙尚香',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg',
                },
                {
                    name: '妲己',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg',
                },
            ],
        },
        {
            categoryName: '战士',
            heroes: [
                {
                    name: '赵云',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg',
                },
                {
                    name: '墨子',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg',
                },
                {
                    name: '钟无艳',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg',
                },
                {
                    name: '吕布',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg',
                },
                {
                    name: '夏侯惇',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg',
                },
                {
                    name: '曹操',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg',
                },
                {
                    name: '典韦',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg',
                },
                {
                    name: '宫本武藏',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg',
                },
                {
                    name: '达摩',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg',
                },
                {
                    name: '老夫子',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg',
                },
                {
                    name: '关羽',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg',
                },
                {
                    name: '程咬金',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg',
                },
                {
                    name: '露娜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg',
                },
                {
                    name: '花木兰',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg',
                },
                {
                    name: '橘右京',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg',
                },
                {
                    name: '亚瑟',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
                },
                {
                    name: '孙悟空',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg',
                },
                {
                    name: '刘备',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg',
                },
                {
                    name: '杨戬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg',
                },
                {
                    name: '雅典娜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg',
                },
                {
                    name: '哪吒',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg',
                },
                {
                    name: '铠',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg',
                },
                {
                    name: '梦奇',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg',
                },
                {
                    name: '裴擒虎',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg',
                },
                {
                    name: '狂铁',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg',
                },
                {
                    name: '孙策',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg',
                },
                {
                    name: '李信',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
                },
                {
                    name: '盘古',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg',
                },
                {
                    name: '云中君',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg',
                },
                {
                    name: '曜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg',
                },
                {
                    name: '马超',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg',
                },
                {
                    name: '蒙恬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg',
                },
                {
                    name: '夏洛特',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg',
                },
                {
                    name: '司空震',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg',
                },
                {
                    name: '云缨',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg',
                },
                {
                    name: '赵怀真',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/544/544.jpg',
                },
            ],
        },
        {
            categoryName: '法师',
            heroes: [
                {
                    name: '小乔',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg',
                },
                {
                    name: '墨子',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg',
                },
                {
                    name: '妲己',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg',
                },
                {
                    name: '嬴政',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg',
                },
                {
                    name: '高渐离',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg',
                },
                {
                    name: '孙膑',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg',
                },
                {
                    name: '扁鹊',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg',
                },
                {
                    name: '芈月',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg',
                },
                {
                    name: '周瑜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg',
                },
                {
                    name: '甄姬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg',
                },
                {
                    name: '武则天',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg',
                },
                {
                    name: '貂蝉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg',
                },
                {
                    name: '安琪拉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg',
                },
                {
                    name: '露娜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg',
                },
                {
                    name: '姜子牙',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg',
                },
                {
                    name: '王昭君',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg',
                },
                {
                    name: '张良',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg',
                },
                {
                    name: '不知火舞',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg',
                },
                {
                    name: '钟馗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg',
                },
                {
                    name: '诸葛亮',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg',
                },
                {
                    name: '干将莫邪',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg',
                },
                {
                    name: '女娲',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg',
                },
                {
                    name: '杨玉环',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg',
                },
                {
                    name: '弈星',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg',
                },
                {
                    name: '米莱狄',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg',
                },
                {
                    name: '司马懿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg',
                },
                {
                    name: '沈梦溪',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg',
                },
                {
                    name: '上官婉儿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg',
                },
                {
                    name: '嫦娥',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg',
                },
                {
                    name: '西施',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg',
                },
                {
                    name: '司空震',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg',
                },
                {
                    name: '金蝉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg',
                },
                {
                    name: '海月',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/521/521.jpg',
                },
            ],
        },
        {
            categoryName: '坦克',
            heroes: [
                {
                    name: '廉颇',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg',
                },
                {
                    name: '庄周',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg',
                },
                {
                    name: '刘禅',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg',
                },
                {
                    name: '钟无艳',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg',
                },
                {
                    name: '白起',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg',
                },
                {
                    name: '芈月',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg',
                },
                {
                    name: '吕布',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg',
                },
                {
                    name: '夏侯惇',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg',
                },
                {
                    name: '达摩',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg',
                },
                {
                    name: '项羽',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg',
                },
                {
                    name: '程咬金',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg',
                },
                {
                    name: '刘邦',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg',
                },
                {
                    name: '亚瑟',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
                },
                {
                    name: '牛魔',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg',
                },
                {
                    name: '张飞',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg',
                },
                {
                    name: '太乙真人',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg',
                },
                {
                    name: '东皇太一',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg',
                },
                {
                    name: '铠',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg',
                },
                {
                    name: '苏烈',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg',
                },
                {
                    name: '梦奇',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg',
                },
                {
                    name: '孙策',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg',
                },
                {
                    name: '盾山',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg',
                },
                {
                    name: '嫦娥',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg',
                },
                {
                    name: '猪八戒',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg',
                },
                {
                    name: '蒙恬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg',
                },
                {
                    name: '阿古朵',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg',
                },
            ],
        },
        {
            categoryName: '刺客',
            heroes: [
                {
                    name: '赵云',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg',
                },
                {
                    name: '阿轲',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg',
                },
                {
                    name: '李白',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg',
                },
                {
                    name: '貂蝉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg',
                },
                {
                    name: '韩信',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg',
                },
                {
                    name: '兰陵王',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg',
                },
                {
                    name: '花木兰',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg',
                },
                {
                    name: '不知火舞',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg',
                },
                {
                    name: '娜可露露',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg',
                },
                {
                    name: '橘右京',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg',
                },
                {
                    name: '孙悟空',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg',
                },
                {
                    name: '百里守约',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg',
                },
                {
                    name: '百里玄策',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg',
                },
                {
                    name: '裴擒虎',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg',
                },
                {
                    name: '元歌',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg',
                },
                {
                    name: '司马懿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg',
                },
                {
                    name: '上官婉儿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg',
                },
                {
                    name: '云中君',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg',
                },
                {
                    name: '马超',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg',
                },
                {
                    name: '镜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg',
                },
                {
                    name: '澜',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg',
                },
                {
                    name: '云缨',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg',
                },
                {
                    name: '暃',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg',
                },
            ],
        },
        {
            categoryName: '射手',
            heroes: [
                {
                    name: '孙尚香',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg',
                },
                {
                    name: '鲁班七号',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg',
                },
                {
                    name: '马可波罗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg',
                },
                {
                    name: '狄仁杰',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg',
                },
                {
                    name: '后羿',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg',
                },
                {
                    name: '李元芳',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg',
                },
                {
                    name: '虞姬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg',
                },
                {
                    name: '成吉思汗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg',
                },
                {
                    name: '黄忠',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg',
                },
                {
                    name: '百里守约',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg',
                },
                {
                    name: '公孙离',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg',
                },
                {
                    name: '伽罗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg',
                },
                {
                    name: '蒙犽',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg',
                },
                {
                    name: '艾琳',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg',
                },
                {
                    name: '戈娅',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/548/548.jpg',
                },
                {
                    name: '莱西奥',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/545/545.jpg',
                },
            ],
        },
        {
            categoryName: '辅助',
            heroes: [
                {
                    name: '庄周',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg',
                },
                {
                    name: '刘禅',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg',
                },
                {
                    name: '孙膑',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg',
                },
                {
                    name: '牛魔',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg',
                },
                {
                    name: '张飞',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg',
                },
                {
                    name: '钟馗',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg',
                },
                {
                    name: '蔡文姬',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg',
                },
                {
                    name: '太乙真人',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg',
                },
                {
                    name: '大乔',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg',
                },
                {
                    name: '东皇太一',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg',
                },
                {
                    name: '鬼谷子',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg',
                },
                {
                    name: '苏烈',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg',
                },
                {
                    name: '明世隐',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg',
                },
                {
                    name: '盾山',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg',
                },
                {
                    name: '瑶',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg',
                },
                {
                    name: '鲁班大师',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg',
                },
                {
                    name: '金蝉',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg',
                },
                {
                    name: '桑启',
                    avatar:
                        'https://game.gtimg.cn/images/yxzj/img201606/heroimg/534/534.jpg',
                },
            ],
        },
    ]
    for (var cat of rowData) {
        if (cat.categoryName === '热门') {
            continue  //退出当前循环
        }

        const category = await categories.findOne({
            name: cat.categoryName,
        })
        cat.heroes = cat.heroes.map(hero => {
            hero.categories = [category]
            return hero
        })
        await heroes.insertMany(cat.heroes)
    }
    res.send(await heroes.find())
})

router.get('/hero/list', async (req, res) => {
    const categories = mongoose.model('categories')
    const heroes = mongoose.model('hero')
    const parent = await categories.findOne({
        name: '英雄分类',
    })
    const cats = await categories.aggregate([
        //聚合查询 查询关联数据 灵活 并且随意
        {
            $match: { parent: parent._id }, //相当于where 查找 id数据
        },
        {
            $lookup: {
                from: 'heroes', //查询的关联表 名字与模块的名字可能不一样 如果模块名是Article 要变成小写加复数articles
                localField: '_id', //通过本表本模型categories的_id
                foreignField: 'categories', //去articles的表(模型)中的categories查找与_id相等的对应数据 作为newsList的值
                as: 'heroList', //查询后的新字段名设置
            },
        },
    ])
    const subCat = cats.map((v) => v._id)
    cats.unshift({
        name: '热门',
        heroList: await heroes
            .find()
            .where({
                categories: { $in: subCat }, //$in 操作符 $in 运算符用于选择字段值等于数组中任何给定值的文档
            })
            .populate('categories')
            .limit(10)
            .lean(),
    })
    res.send(cats)
})

//获取文章详情
router.get('/news/:id',async(req, res) => {
    const Article = mongoose.model('article')
    res.send(await Article.findById(req.params.id).lean())
})
//获取英雄的详情
//获取文章详情
router.get('/hero/:id',async(req, res) => {
    const Hero = mongoose.model('hero')
    res.send(await Hero.findById(req.params.id).populate(['categories','items1','items2', 'partners.hero'
]).lean())
})


module.exports = router
