const mongoose = require('mongoose')    // mongoose可以帮助我们操作mongodb


mongoose.connect('mongodb://localhost:27017/1009', { useNewUrlParser: 

true, useUnifiedTopology: true  })


const Schema = mongoose.Schema  // 数据库模型规定

const userSchema = new Schema({  //  指定数据字段和数据类型
  img:String,  
  username: String,  // 定义一个字段，类型是String
  password: String,  // 定义一个字段，类型是password
  
})

// 开始操作模型   User指的是表名
const User = mongoose.model('User', userSchema, 'user')
module.exports = User   // 导出
