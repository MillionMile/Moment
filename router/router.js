const  app=require("express");
const commentCon=require("./commentCON");

module.exports=function () {
  let router=app.Router();
  router.use('/commentList',commentCon());
  return router;
};