const app=require('express');
const pictureDao=require("../dao/pictureDao");
const operationDao=require("../dao/OperationDao.js");

module.exports=function () {
    let router=app.Router();

    router.get('/:acton',(req,res)=>{
        switch(req.params.acton){
            case "Trending-Pic":
               pictureDao.Pictures((err,data)=>{
                   (function iterator(i) {
                      if(i===data.length){
                          res.render("picturesList",{list:data});
                          return;
                      }
                      checkFavor(req.session['user_id'],data[i]._id,(result)=>{
                         data[i].isFavor=result;
                         //console.log(i+'|'+result);
                         iterator(i+1);
                              });
                           })(0);
                       });
             break;
        }
    });

    return router;
};

//统计数目（判断是否存在已经点赞、收藏）
function checkFavor(user_id, picture,cb){
    operationDao.OperationsCount({user_id:user_id},picture,{vote:{$exists:true}},(err,res)=>{
            if (err)
                console.log("查找失败", err);
            else{
                //console.log("查找成功", res);
                cb(res);
            }
    });
}
