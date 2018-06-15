const operationDao = require("../dao/operationDao.js");

var func = () => {
    let checkVote = (user_id, picture, cb) => {
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
    let getVoteCountOfPic = (picture, cb) => {
        operationDao.UsersOfVote(picture, (err, res) => {
            if (err) {
                cb(0);
            }
            else {
                cb(res);
            }
        })
    }
}

module.exports = func();