const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gameProject', { useNewUrlParser: true })
    .then(() => {
        require('require-all')(__dirname + '/../module') //注意是绝对路径 
        console.log('Connected!')
    }
    );
 //作用是把指定文件夹下的所有文件引入 目的创建数据表