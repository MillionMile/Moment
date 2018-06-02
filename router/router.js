const  app=require("express");
const commentCon=require("./commentCON");
const remenCON=require("./remenCON");
const voteCON=require("./voteCON");

module.exports=function () {
  let router=app.Router();
  router.use('/commentList',commentCon());
  router.use('/remen',remenCON());
  router.use('/vote',voteCON());
  return router;
};
