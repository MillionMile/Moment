const operationDao = require("../dao/OperationDao.js");
const userDao = require("../dao/userDao.js");
const app = require('express');

//和图片模块的查看图片详情功能合并时，并不需要*default：*的默认加载模块，但要传递*Picture_id:Picture_id*
// 只需要通过router获得该controller
//的具体方法，爱用json格式返回前端即可

module.exports = function () {
    let router = app.Router();

<<<<<<< HEAD
   router.get('/',(req,res)=>{
   let Picture_id=req.query.Picture_id;
       // console.log(Picture_id);
      switch (req.query.action){
          case "find"://获取具体图片的评论列表（Picture_id,page）
              let page=req.query.page;
              operationDao.CommentsOfPicture(Picture_id,5,page,(err,result)=>{//5条一页
                   //console.log(result);
                   // res.send(result);
                  res.json(result);
              });
              break;
          case "delete"://删除评论(_id)
              let id=req.query.id
              operationDao.remove({_id:id},(err,result)=>{
                  console.log(result);
                  res.redirect("/commentsList?Picture_id="+Picture_id);
              });
              break;
          case "count"://获得评论总数（Picture_id，operations）
              operationDao.OperationsCount({},Picture_id,{comment:{$exists:true}},(err,result)=>{
                  //console.log(result);
                  res.send({"result":result});
              });
              break;
          default://加载默认模板
                  res.render("commentsList",
                  {
                      Picture_id:Picture_id,
                      login:req.session['login'],
                      username:req.session["username"],
                  });
              break;
      }
   });
    router.post('/',(req,res)=>{
        let user_id = req.session['user_id'];
        let picture_id=req.body.picture_id;
        let content=req.body.content;
        operationDao.PictureComment(user_id,picture_id,content,(err,result)=>{
=======
    router.get('/', (req, res) => {
        let Picture_id = req.query.Picture_id;
        // console.log(Picture_id);
        switch (req.query.action) {
            case "find"://获取具体图片的评论列表（Picture_id,page）
                // let page = req.query.page;
                // operationDao.CommentsOfPicture(Picture_id, 5, page, (err, result) => {//5条一页
                //     //console.log(result);
                //     // res.send(result);
                //     res.json(result);
                // });
                operationDao.CommentsOfPicture(Picture_id, (err, result) => {//5条一页
                    //console.log(result);
                    // res.send(result);
                    res.json(result);
                });
                break;
            case "delete"://删除评论(_id)
                let id = req.query.id
                operationDao.remove({ _id: id }, (err, result) => {
                    console.log(result);
                    res.redirect("/commentsList?Picture_id=" + Picture_id);
                });
                break;
            case "count"://获得评论总数（Picture_id，operations）
                operationDao.OperationsCount({}, Picture_id, { comment: { $exists: true } }, (err, result) => {
                    //console.log(result);
                    res.send({ "result": result });
                });
                break;
            default://加载默认模板
                checkVote(req.session['user_id'], Picture_id, (result) => {
                    isVote = result;
                    getVoteCountOfPic(Picture_id, (dataCount) => {
                        voteCount = dataCount;
                        res.render("commentsList",
                            {
                                Picture_id: Picture_id,
                                login: req.session['login'],
                                username: req.session["username"],
                                isVote: isVote,
                                voteCount: voteCount
                            });
                    })
                });
                break;
        }
    });
    router.post('/', (req, res) => {
        let user_id = req.session['user_id'];
        let picture_id = req.body.picture_id;
        let content = req.body.content;
        operationDao.PictureComment(user_id, picture_id, content, (err, result) => {
>>>>>>> pr/2
            //console.log(result);
            if (err) {
                res.send({ "result": -1 });
                return;
            }
            res.json({ "result": 1 });
        });
    });
    return router;
};


//判断用户是否有点赞当前图片
function checkVote(user_id, picture, cb) {
    operationDao.OperationsCount({ user_id: user_id }, picture, { vote: { $exists: true } }, (err, res) => {
        if (err) {
            cb(0);
        }
        else {
            cb(res);
        }
    });
}

//获取当前图片点赞人数
function getVoteCountOfPic(picture, cb) {
    operationDao.UsersOfVote(picture, (err, res) => {
        if (err) {
            cb(0);
        }
        else {
            cb(res);
        }
    })
}