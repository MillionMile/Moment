const  app=require("express");
const commentCON=require("./commentCON");
const listCON=require("./picturesListCON");
const voteCON=require("./voteCON");
const favorCON=require("./favorCON");

module.exports=function () {
  let router=app.Router();

    router.use(function (req,res,next) {
        //模拟登录session
        req.session.user_id = "5b04375510fe443358c0cf63";
        req.session.username="test2";
        req.session.login = "1";

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
    router.get('/',function (req,res) {
        res.redirect('/picturesList/Trending-Pic');
  });
  return router;
};