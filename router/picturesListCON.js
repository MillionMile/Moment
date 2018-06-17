const app = require('express');
const pictureDao = require("../dao/pictureDao");
const operationDao = require("../dao/operationDao.js");
const userDao = require("../dao/userDao.js");
const folderDao = require('../dao/folderDao')

module.exports = function () {
    let router = app.Router();

    router.get('/:acton', (req, res) => {
        let folder_id = req.query.folder_id;
        switch (req.params.acton) {
            case "trendingPic":
                res.render("trendingPic", { isLogin: !!req.session["user_id"] });
                break;
            case "getTrendingPic":
                pictureDao.Pictures((err, data) => {
                    (function iterator(i) {
                        if (i === data.length) {
                            res.json(data);
                            return;
                        }
                        operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                            { vote: { $exists: true } }, (err, result1) => {
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                            //平凑json字符串
                                            data[i]._doc.voteCount = dataCount.length;
                                            data[i]._doc.isVote = result1;
                                            data[i]._doc.isFavor = result2;
                                            iterator(i + 1);
                                        });
                                    });
                            });
                    })(0);
                });
                break;
            case "picInFolder":
                res.render("picturesListInFolder", {
                    folder_id: folder_id, isLogin: true
                });
                break;
            case "getPicInFolder":
                operationDao.PicturesOfFavor(req.session["user_id"], folder_id, (err, result) => {
                    //console.log(result);
                    res.json(result);
                });
                break;
            case "favorFolders":
                res.render("favorsList", { isLogin: true });
                break;
            case "getFavorFolders":
                userDao.findUFoldersById(req.session["user_id"], (err, result) => {
                    // console.log(result.folders);
                    res.json(result.folders);
                });
                break;
            case "searchPicture":
                pictureDao.FindByTagNAbstract(req.query.keyword, (err, data) => {
                    if (!data || data.length === 0) {
                        res.json(false);
                        return;
                    }
                    (function iterator(i) {
                        if (i === data.length) {
                            res.json(data);
                            return;
                        }
                        operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                            { vote: { $exists: true } }, (err, result1) => {
                                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                    { favor: { $exists: true } }, (err, result2) => {
                                        operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                            //拼凑json字符串
                                            data[i]._doc.voteCount = dataCount.length;
                                            data[i]._doc.isVote = result1;
                                            data[i]._doc.isFavor = result2;
                                            iterator(i + 1);
                                        });
                                    });
                            });
                    })(0);
                });
                break;

            //---------新增------------
            case "discover":
                //编辑自己上传的某张图片  picture_id
                //仅链接页面，未添加功能
                res.render("discover", { isLogin: !!req.session["user_id"], urlPath: "discover" });
                break;
            case "getDiscover":
                /*
                试用数据（获取所有图片数据），下面的get函数雷同，不加赘述
                pictureDao.Pictures((err, data) => {
                        (function iterator(i) {
                            if (i === data.length) {
                                res.json(data);
                                return;
                            }
                            operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                { vote: { $exists: true } }, (err, result1) => {
                                    operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                                        { favor: { $exists: true } }, (err, result2) => {
                                            operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                                //平凑json字符串
                                                data[i]._doc.voteCount = dataCount.length;
                                                data[i]._doc.isVote = result1;
                                                data[i]._doc.isFavor = result2;
                                                iterator(i + 1);
                                            });
                                        });
                                });
                        })(0);
                    });
                */
                break;
            case "freshNew":
                //编辑自己上传的某张图片  picture_id
                //仅链接页面，未添加功能
                res.render("freshNew", { isLogin: !!req.session["user_id"], urlPath: "freashNew" });
                break;

            case "getFreshNew":
                break;

            case "rank":
                //编辑自己上传的某张图片  picture_id
                //仅链接页面，未添加功能
                res.render("rank", { isLogin: !!req.session["user_id"] });
                break;
                
            case "pictureManage":
                //编辑自己上传的某张图片  picture_id
                //仅链接页面，未添加功能
                res.render("pictureManage", { isLogin: !!req.session["user_id"] });
                break;
            default:
                break;
        }
    });

    return router;
};

