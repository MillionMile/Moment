const  app=require("express");
const commentCON=require("./commentCON");
const listCON=require("./picturesListCON");
const voteCON=require("./voteCON");
const favorCON=require("./favorCON");

const operationDao = require("../dao/OperationDao.js");
const pictureDao=require("../dao/pictureDao");

module.exports=function () {
  let router=app.Router();

    router.use(function (req,res,next) {
        //模拟登录session
        req.session.user_id = "5b04375510fe443358c0cf63";
        req.session.username="test2";

        if(!req.session['user_id'] && req.url !== '/login'){
            res.redirect('/xxxxx');//到时在写
        }else{
            next();
        }
    });
    router.use('/commentsList',commentCON());
    router.use('/picturesList',listCON());
    router.use('/vote',voteCON());
    router.use('/favor',favorCON());
    router.use('/',(req,res)=>{
        res.render("index", { isLogin: !!req.session["user_id"] });
    });
  return router;
};
