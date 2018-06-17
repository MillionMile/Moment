const app=require('express');
const pictureDao=require("../dao/pictureDao");
const operationDao=require("../dao/operationDao.js");
const userDao=require("../dao/userDao.js");
const folderDao = require('../dao/folderDao')

module.exports=function () {
    let router=app.Router();

    router.get('/:acton',(req,res)=>{
        let folder_id=req.query.folder_id;
        switch(req.params.acton){
            case "Trending-Pic":
                let isLogin=!!req.session["user_id"];
                res.render("picturesList",{isLogin: isLogin});
                break;
            case "GetTrending-Pic":
                pictureDao.Pictures((err,data)=>{
                    (function iterator(i) {
                        if(i===data.length){
                            res.json(data);
                            return;
                        }
                        operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                            {vote:{$exists:true}}, (err,result1)=>{
                                operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                                    {favor:{$exists:true}}, (err,result2)=>{
                                        operationDao.UsersOfVote(data[i]._id, (err, dataCount) =>{
                                            //平凑json字符串
                                            data[i]._doc.voteCount=dataCount.length;
                                            data[i]._doc.isVote=result1;
                                            data[i]._doc.isFavor=result2;
                                        iterator(i+1);
                                        });
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
            case "searchPicture":
                pictureDao.FindByTagNAbstract(req.query.keyword,(err, data) => {
                    if(!data||data.length===0){
                        res.json(false);
                        return;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.json(data);
                            return;
                        }
                        operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                            { vote: { $exists: true } }, (err, result1) => {
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                            //拼凑json字符串
                                            data[i]._doc.voteCount = dataCount.length;
                                            data[i]._doc.isVote = result1;
                                            data[i]._doc.isFavor = result2;
                                            iterator(i + 1);
                                        });
                                    });
                            });
                    })(0);
                });
                break;
            default:
                break;
        }
    });

    return router;
};

