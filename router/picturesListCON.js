const app=require('express')
const pictureDao=require("../dao/pictureDao")
const operationDao=require("../dao/operationDao.js")
const userDao=require("../dao/userDao.js")
const folderDao = require('../dao/folderDao')

module.exports=function () {
    let router=app.Router()

    router.get('/trendingPic',(req,res)=>{
        res.render("picturesList",{isLogin: !!req.session["user_id"]})
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
            folderId:req.query.folderId,
        })
    })
           
    router.get('/getPicInFolder',(req,res)=>{
        operationDao.PicturesOfFavor(req.session["user_id"],req.query.folderId,(err,result)=>{
            res.json(result)
        })
    })

    router.get('/favorFolders',(req,res)=>{
        if(!req.session["user_id"]){
            res.redirect('/')
        }
        res.render("favorsList")
    })

    router.get('/getFavorFolders',(req,res)=>{
        userDao.findUFoldersById(req.session["user_id"],(err,result)=>{
            // console.log(result.folders)
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

    return router
}

