const app = require('express');
const pictureDao = require("../dao/pictureDao");
const operationDao = require("../dao/OperationDao.js");

module.exports = function () {
    let router = app.Router();

    router.get('/:action', (req, res) => {
        switch (req.params.action) {
            case "Trending-Pic":
                pictureDao.Pictures((err, data) => {
                    if (req.session.user_id) {
                        isLogin = true;
                    } else {
                        isLogin = false;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.render("picturesList", { list: data, isLogin: isLogin });
                            return;
                        }
                        checkVote(req.session['user_id'], data[i]._id, (result) => {
                            data[i].isVote = result;
                            getVoteCountOfPic(data[i]._id,(dataCount)=>{
                                data[i].voteCount=dataCount.length;
                                iterator(i + 1);
                            })

                        });
                    })(0);
                });
                break;
        }
    });

    return router;
};

//判断用户是否有点赞当前图片
function checkVote(user_id, picture, cb) {
    operationDao.OperationsCount({ user_id: user_id }, picture, { vote: { $exists: true } }, (err, res) => {
        if (err) {
            cb(0);
            console.log("查找失败", err);
        }
        else {
            cb(res);
        }
    });
}


//获取当前图片点赞人数
function getVoteCountOfPic(picture,cb){
    operationDao.UsersOfVote(picture,(err,res)=>{
        if (err) {
            cb(0);
        }
        else {
            cb(res);
        }
    })
}
