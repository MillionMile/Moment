const app=require('express');
const pictureDao=require("../dao/pictureDao");
const operationDao=require("../dao/OperationDao.js");
const userDao=require("../dao/userDao.js");
const folderDao = require('../dao/folderDao')

module.exports=function () {
    let router=app.Router();

    router.get('/:acton',(req,res)=>{
        let folder_id=req.query.folder_id;
        switch(req.params.acton){
            case "Trending-Pic":
               pictureDao.Pictures((err,data)=>{
                   (function iterator(i) {
                      if(i===data.length){
                          res.render("picturesList",{list:data});
                          return;
                      }
                       operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                           {vote:{$exists:true}}, (err,result1)=>{
                               operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                                   {favor:{$exists:true}}, (err,result2)=>{
                                   data[i].isVote=result1;
                                   data[i].isFavor=result2;
                                   // console.log(i+'|'+result1);
                                   // console.log(i+'|'+result2);
                                   iterator(i+1);
                                });
                              });
                           })(0);
                       });
                break;
            case "PicInFolder":
                    res.render("picturesListInFolder",{
                        folder_id:folder_id,
                    });
                break;
            case "GetPicInFolder":
                operationDao.PicturesOfFavor(req.session["user_id"],folder_id,(err,result)=>{
                    //console.log(result);
                    res.json(result);
                });
                break;
            case "FavorFolders":
                    res.render("favorsList");
                break;
            case "GetFavorFolders":
                userDao.findUFoldersById(req.session["user_id"],(err,result)=>{
                    // console.log(result.folders);
                    res.json(result.folders);
                });
                break;
            default:
                break;
        }
    });

    return router;
};