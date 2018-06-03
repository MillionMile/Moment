const app = require("express");
const commentCON = require("./commentCON");
const listCON = require("./picturesListCON");
const voteCON = require("./voteCON");

const pictureDao = require("../dao/pictureDao");  //暂时用于显示首页图片，之后可删
const operationDao = require("../dao/OperationDao.js");//暂时用于显示首页图片，之后可删

module.exports = function () {
    let router = app.Router();

    router.use(function (req, res, next) {
        //模拟登录session
        req.session.user_id = "5b04375510fe443358c0cf63";

        // if (!req.session['user_id'] && req.url !== '/login') {
        //     res.redirect('/xxxxx');//到时再写
        // } else {
        next();
        // }
    });
    router.use('/commentsList', commentCON());
    router.use('/picturesList', listCON());
    router.use('/vote', voteCON());
    router.get('/', function (req, res) {
        // res.redirect('/picturesList/Trending-Pic');

        //----------暂时用于显示首页图片，之后可删
        pictureDao.Pictures((err, data) => {
            if (req.session.user_id) {
                isLogin = true;
            } else {
                isLogin = false;
            }
            (function iterator(i) {
                if (i === data.length) {
                    res.render("index", { list: data, isLogin: isLogin });
                    return;
                }
                checkVote(req.session['user_id'], data[i]._id, (result) => {
                    data[i].isVote = result;
                    getVoteCountOfPic(data[i]._id, (dataCount) => {
                        data[i].voteCount = dataCount.length;
                        iterator(i + 1);
                    })
                });
            })(0);
        });
        //------------暂时用于显示首页图片，之后可删
    });
    return router;
};



//-----------------暂时用于显示首页图片，之后可删
//判断用户是否有点赞当前图片
function checkVote(user_id, picture, cb) {
    operationDao.OperationsCount({ user_id: user_id }, picture, { vote: { $exists: true } }, (err, res) => {
        if (err) {
            cb(0);
            console.log('查找失败');
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
//-----------------暂时用于显示首页图片，之后可删
