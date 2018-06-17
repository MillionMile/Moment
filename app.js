const express = require("express");
const app = express();
const router = require("./router/router.js");
const session = require('express-session');
const bodyParser = require('body-parser');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//解析请求数据
app.use(bodyParser({
    extended: false
}));

//模板引擎
app.set("view engine", "ejs");

//静态页面
app.use(express.static("./public"));

//设置路由
app.use('/', router());

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

module.exports = app