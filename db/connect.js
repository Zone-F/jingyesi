const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jingyesi', {useNewUrlParser: true}, (err) => (
  err ? console.log('数据库连接失败') : console.log('数据库连接成功')
))
