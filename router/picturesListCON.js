const app = require('express');
const pictureDao = require("../dao/pictureDao");
const operationDao = require("../dao/OperationDao.js");
const userDao = require('../dao/userDao');
const folderDao = require('../dao/folderDao');
module.exports = function () {
    let router = app.Router();

    router.get('/:action', (req, res) => {
        let folder_id = req.query.folder_id;
        switch (req.params.action) {
            case "discover":
                pictureDao.Pictures((err, data) => {
                    if (req.session.user_id) {
                        isLogin = true;
                    } else {
                        isLogin = false;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.render("discover", { list: data, isLogin: isLogin });
                            return;
                        }
                        checkVote(req.session['user_id'], data[i]._id, (result) => {
                            data[i].isVote = result;
                            getVoteCountOfPic(data[i]._id, (dataCount) => {
                                data[i].voteCount = dataCount.length;
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        data[i].isFavor = result2;
                                        iterator(i + 1);
                                    });
                            })
                        });
                    })(0);
                });
                break;
            case "hot":
                pictureDao.Pictures((err, data) => {
                    if (req.session.user_id) {
                        isLogin = true;
                    } else {
                        isLogin = false;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.render("hot", { list: data, isLogin: isLogin });
                            return;
                        }
                        checkVote(req.session['user_id'], data[i]._id, (result) => {
                            data[i].isVote = result;
                            getVoteCountOfPic(data[i]._id, (dataCount) => {
                                data[i].voteCount = dataCount.length;
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        data[i].isFavor = result2;
                                        iterator(i + 1);
                                    });
                            })
                        });
                    })(0);
                });
                break;

            case "freshNew":
                pictureDao.Pictures((err, data) => {
                    if (req.session.user_id) {
                        isLogin = true;
                    } else {
                        isLogin = false;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.render("freshNew", { list: data, isLogin: isLogin });
                            return;
                        }
                        checkVote(req.session['user_id'], data[i]._id, (result) => {
                            data[i].isVote = result;
                            getVoteCountOfPic(data[i]._id, (dataCount) => {
                                data[i].voteCount = dataCount.length;
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        data[i].isFavor = result2;
                                        iterator(i + 1);
                                    });
                            })
                        });
                    })(0);
                });
                break;
            case "hot":
                pictureDao.Pictures((err, data) => {
                    if (req.session.user_id) {
                        isLogin = true;
                    } else {
                        isLogin = false;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.render("hot", { list: data, isLogin: isLogin });
                            return;
                        }
                        checkVote(req.session['user_id'], data[i]._id, (result) => {
                            data[i].isVote = result;
                            getVoteCountOfPic(data[i]._id, (dataCount) => {
                                data[i].voteCount = dataCount.length;
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        data[i].isFavor = result2;
                                        iterator(i + 1);
                                    });
                            })
                        });
                    })(0);
                });
                break;
            case "rank":
                pictureDao.Pictures((err, data) => {
                    res.render("rank", { list: data, isLogin: isLogin });
                    return;
                });
                break;
//----------------------------------------------------------------------------------------------------------
            case "PicInFolder":
                res.render("picturesListInFolder", {
                    folder_id: folder_id,
                });
                break;
            case "GetPicInFolder":
                operationDao.PicturesOfFavor(req.session["user_id"], folder_id, (err, result) => {
                    //console.log(result);
                    res.json(result);
                });
                break;
            case "FavorFolders":
                res.render("favorsList");
                break;
            case "GetFavorFolders":
                userDao.findUFoldersById(req.session["user_id"], (err, result) => {
                    // console.log(result.folders);
                    res.json(result.folders);
                });
                break;
            default:
                break;
        }
    });

    return router;
};

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