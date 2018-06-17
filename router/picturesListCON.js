const app=require('express')
const pictureDao=require("../dao/pictureDao")
const operationDao=require("../dao/operationDao.js")
const userDao=require("../dao/userDao.js")
const folderDao = require('../dao/folderDao')

module.exports=function () {
    let router=app.Router()

    router.get('/trendingPic',(req,res)=>{
        res.render("trendingPic",{isLogin: !!req.session["user_id"]})
    })

    router.get('/getTrendingPic',(req,res)=>{
        pictureDao.Pictures((err,data)=>{
            (function iterator(i) {
                if(i===data.length){
                    res.json(data)
                    return
                }
                operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                    {vote:{$exists:true}}, (err,result1)=>{
                        operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                            {favor:{$exists:true}}, (err,result2)=>{
                                operationDao.UsersOfVote(data[i]._id, (err, dataCount) =>{
                                    data[i]._doc.voteCount=dataCount.length
                                    data[i]._doc.isVote=result1
                                    data[i]._doc.isFavor=result2
                                iterator(i+1)
                                })
                            })
                        })
            })(0)
        })
    })
                
    router.get('/picInFolder',(req,res)=>{
        res.render("picturesListInFolder",{
            folderId: req.query.folderId, isLogin: true
        })
    })
           
    router.get('/getPicInFolder',(req,res)=>{
        operationDao.PicturesOfFavor(req.session["user_id"],req.query.folderId,(err,result)=>{
            res.json(result)
        })
    })

    router.get('/favorFolders',(req,res)=>{
        res.render("favorsList", { isLogin: true });
    })

    router.get('/getFavorFolders',(req,res)=>{
        userDao.findUFoldersById(req.session["user_id"],(err,result)=>{
            res.json(result.folders)
        })
    })

    router.get('/searchPicture',(req,res)=>{
        pictureDao.FindByTagNAbstract( new RegExp(req.query.keyword),(err, data) => {
            if(!data||data.length===0){
                res.json(false)
                return
            }
            (function iterator(i) {
                if (i === data.length) {
                    res.json(data)
                    return
                }
                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                    { vote: { $exists: true } }, (err, result1) => {
                        operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                            { favor: { $exists: true } }, (err, result2) => {
                                operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                    data[i]._doc.voteCount = dataCount.length
                                    data[i]._doc.isVote = result1
                                    data[i]._doc.isFavor = result2
                                    iterator(i + 1)
                                })
                            })
                    })
            })(0)
        })
    })

    //---------新增------------
    router.get('/discover',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("discover", { isLogin: !!req.session["user_id"], urlPath: "discover" })
    })

    router.get('/getDiscover',(req,res)=>{

    })

    router.get('/freshNew',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("freshNew", { isLogin: !!req.session["user_id"], urlPath: "freashNew" })
    })
   
    router.get('/getFreshNew',(req,res)=>{

    })

    router.get('/rank',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("rank", { isLogin: !!req.session["user_id"] })
    })

    router.get('/getRank',(req,res)=>{

    })

    router.get('/pictureManage',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("pictureManage", { isLogin: !!req.session["user_id"] });
    })
    
    return router
}

