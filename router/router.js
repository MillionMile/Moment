const app = require("express");
const commentCON = require("./commentCON");
const listCON = require("./picturesListCON");
const voteCON = require("./voteCON");
const favorCON = require("./favorCON");
const userCON = require('./userCON')

module.exports=function () {
  let router=app.Router();

    router.use('/user', userCON())
    router.use('/commentsList', commentCON())
    router.use('/picturesList', listCON())
    router.use('/vote', voteCON())
    router.use('/favor', favorCON())
    router.use('/',(req,res)=>{
        res.render("index", { isLogin: !!req.session["user_id"] })
    })

  return router

}
