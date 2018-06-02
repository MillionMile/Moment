// const operationDao=require("../dao/OperationDao.js");
// const userDao=require("../dao/userDao.js");
const app = require('express');
const pictureDao = require("../dao/pictureDao")
const operationDao=require("../dao/OperationDao.js");
module.exports = function () {
    let router = app.Router();

    router.get('/', (req, res) => {
        pictureDao.Pictures((err, data) => {
            (function a(i){
                if(i==data.length){
                    res.render('remen', { list: data });
                    return;
                }
                checkFavor("5b12287a9217ec0c481447b5", data[i]._id,(result)=>{
                    data[i].isFavor=result;
                    console.log(i+'|'+result);
                    a(i+1);
                });
            })(0);
        })
    });
    return router;
};


//统计数目（判断是否存在已经点赞、收藏）
function checkFavor(user_id, picture,cb){
    operationDao.count(
        {
            $and: [
                { user_id: user_id },
                { picture: picture },
                { vote: { $exists: true } },
            ]
        },
        (err, res) => {
            if (err)
                console.log("查找失败", err);
            else{
                console.log("查找成功", res);
                cb(res);
            }
    })
}
