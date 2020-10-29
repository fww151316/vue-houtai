const express = require('express')
const User = require('./user')
const app = new express()
app.set('view engine', 'ejs')
app.use(express.urlencoded())
var bodyParser = require('body-parser')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads')   //使用uploads文件存放图片
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

app.use('/uploads',express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }))




// parse application/json
app.use(bodyParser.json())



app.post('/upload', upload.single('avatar'), function (req, res, next) {
    console.log(req.file.path)
    res.json({
        code: 200,
        msg: '图片上传成功',
        path: req.file.path
    })

})



app.post('/login', (req, res) => {
    console.log(req.body)

    User.find(req.body).then(mon => {
        if (mon != "") {
            res.json({
                msg: mon
            })
        } else (
            res.json({
                msg: 1234
            })
        )
    })
})


app.post('/list', (req, res) => {
    User.find().then(mon => {
        res.json({
            msg: mon
        })
    })
})



app.get('/gai', (req, res) => {
    User.find().then(mon => {
        res.json({
            msg: mon
        })
    })
})

app.post('/zhu', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save().then(mon => {
        if (mon) {
            res.json({
                code: 200,
                msg: '数据添加成功'
            })
        }
    })
})


app.post('/shan', (req, res) => {
    console.log(req.body)
    const id = req.body._id
    User.findByIdAndDelete(id).then(mon => {
        res.json({
            code: 200,
            msg: '删除成功'
        })
    })
})

app.post('/xui', (req, res) => {
    console.log(req.body)
    const id = req.body.id
    User.findByIdAndUpdate(id, {
        username: req.body.username,
        password: req.body.password,
        img:req.body.img
    }).then(mon => {
        res.json({
            code: 200,
            msg: '数据修改成功'
        })
    })
})
app.listen(7777, '127.0.0.1')