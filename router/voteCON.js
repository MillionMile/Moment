const app = require('express');
const operationDao = require("../dao/OperationDao.js");

module.exports=function () {
    let router=app.Router();

    router.get('/addVote', (req, res) => {//创建点赞(user_id,picture_id)
        let picture_id = req.query.Picture_id;
        let user_id = req.session['user_id'];

        operationDao.PictureVote(user_id,picture_id,(err, res) => {
        });
    });

    router.get('/delVote', (req, res) => {//取消点赞(user_id,picture_id)
        let picture_id = req.query.Picture_id;
        let user_id = req.session['user_id'];
        operationDao.remove({
            user_id: user_id,
            picture: picture_id,
            vote:{$exists:true},
        }, (err, res) => {
        });
    });

  return router;
};