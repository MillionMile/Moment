const operationDao=require("../dao/OperationDao.js");
const userDao=require("../dao/userDao.js");
const app=require('express');

//和图片模块的查看图片详情功能合并时，并不需要*default：*的默认加载模块，但要传递*Picture_id:Picture_id*
// 只需要通过router获得该controller
//的具体方法，爱用json格式返回前端即可

module.exports=function () {
   let router=app.Router();

   router.get('/',(req,res)=>{
   let Picture_id=req.query.Picture_id;
       // console.log(Picture_id);
      switch (req.query.action){
          case "find"://获取具体图片的评论列表（Picture_id,page）
              let page=req.query.page;
              operationDao.CommentsOfPicture(Picture_id,5,page,(err,result)=>{
                   //console.log(result);
                   // res.send(result);
                  res.json(result);
              });
              break;
          case "delete"://删除评论(_id)
              let id=req.query.id
              operationDao.remove({_id:id},(err,result)=>{
                  // console.log(result);
                  res.redirect("/commentList?Picture_id="+Picture_id);
              });
              break;
          case "count"://获得评论总数（Picture_id，operations）
              operationDao.OperationsCount({},Picture_id,{comment:{$exists:true}},(err,result)=>{
                  //console.log(result);
                  res.send({"result":result});
              });
              break;
          default://加载默认模板
                  res.render("commentList",
                  {
                      Picture_id:Picture_id,
                  });
              break;
      }
   });
    router.post('/',(req,res)=>{
        let user_id = req.body.user_id;
        let picture_id=req.body.picture_id;
        let content=req.body.content;
        operationDao.PictureComment(user_id,picture_id,content,(err,result)=>{
            //console.log(result);
            if(err){
                res.send({"result":-1});
                return;
            }
            res.json({"result":1});
        });
    });
   return router;
};