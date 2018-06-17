const app = require('express')
const operationDao = require("../dao/operationDao.js")
const userDao=require("../dao/userDao.js")
const folderDao=require("../dao/folderDao.js")

module.exports=function () {
    let router=app.Router()
    router.post("/addFavor",(req,res)=>{
         // 创建收藏夹(folderName)
         // 1.创建文件夹
         // 2.在user的folders列表中添加folder的id
        let folderName=req.body.folderName
        folderDao.create({folder_name:folderName,},(err,result)=>{
                if(err){
                    res.send({"result":-1})
                    return
                }
               userDao.FolderAdd(req.session["user_id"],result._id,(err,result2)=>{
                   res.json({"result":1})
               })
        })
    })

    router.get("/deleteFolder",(req,res)=>{
        // 删除收藏夹(_id)
        // 1.删除相应的收藏动作
        // 3.在user的folders列表中删除folder的id
        // 2.删除文件夹
        let folder_id=req.query.folder_id
        operationDao.FavorsAllDeleteByFolder(folder_id,()=>{
            userDao.FolderDelete(req.session["user_id"],folder_id,()=>{
               folderDao.remove({_id:folder_id},()=>{
                   res.send({"result":1})
               })
            })
        })
    })

    router.get("/",(req,res)=>{
        let pictureId=req.query.pictureId
        userDao.findUFoldersById(req.session["user_id"],(err,result)=>{
            res.render("favor",{
                list:result.folders,
                pictureId:pictureId,
            })
        })
    })

    router.post("/doFavor",(req,res)=>{
        //添加图片到某收藏夹
        //1.判断是否已经被收藏
        //  Y：1.返回信息
        //  N：2.收藏
        let folder_id=req.body.folder_id
        let picture=req.body.pictureId
        operationDao.OperationsCount({user_id:req.session["user_id"]},picture,{favor:{$exists:true}},(err,result)=>{
           if(result>0){
               console.log(result)
               res.send({"result":-1})
           }else{
               operationDao.PictureFavor(req.session["user_id"],picture,folder_id,()=>{
                  res.send({"result":1})
               })
           }
        })
    })

    router.get('/delFavor', (req, res) => {//取消收藏(user_id,pictureId)
        let pictureId = req.query.pictureId
        let user_id = req.session['user_id']
        operationDao.remove({
            user_id: user_id,
            picture: pictureId,
            favor:{$exists:true},
        }, (err, result) => {
            res.send({"result":1})
        })
    })

    return router
}