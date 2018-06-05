const app = require('express');
const operationDao = require("../dao/OperationDao.js");

<<<<<<< HEAD
module.exports=function () {
    let router=app.Router();
=======
module.exports = function () {
    let router = app.Router();
>>>>>>> pr/2

    router.get('/addVote', (req, res) => {//创建点赞(user_id,picture_id)
        let picture_id = req.query.Picture_id;
        let user_id = req.session['user_id'];
<<<<<<< HEAD

        operationDao.PictureVote(user_id,picture_id,(err, res) => {
=======
        operationDao.create({
            user_id: user_id,
            picture: picture_id,
            vote: {},
        }, (err, result) => {
            if (err)
                res.json({ "result": "图片插入失败" + err })
            else
                res.json({ "result": "图片插入成功" + result });
>>>>>>> pr/2
        });
    });

    router.get('/delVote', (req, res) => {//取消点赞(user_id,picture_id)
        let picture_id = req.query.Picture_id;
        let user_id = req.session['user_id'];
        operationDao.remove({
            user_id: user_id,
            picture: picture_id,
<<<<<<< HEAD
            vote:{$exists:true},
        }, (err, res) => {
        });
    });

  return router;
=======
            vote: { $exists: true },
        }, (err, result) => {
            if (err)
                res.json({ "result": "图片插入失败" + err })
            else
                res.json({ "result": "图片插入成功" + result });
        });
    });
    return router;
>>>>>>> pr/2
};