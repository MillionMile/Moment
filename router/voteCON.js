const app = require('express');
const operationDao = require("../dao/OperationDao.js");
module.exports = function () {
    let router = app.Router();
    router.get('/', (req, res) => {
        operationDao.OperationsCount(
            { user_id: "5b04375510fe443358c0cf63" },
            { picture: "5b07fe58960ddc17d404f8d6" },
            { vote: { $exists: true } },
            (err, res) => {
                if (err)
                    console.log("根据Id查找失败", err);
                else
                    console.log("根据Id查找成功", res);
            })
    });

    router.get('/addVote', (req, res) => {
        let picture_id = req.query.Picture_id;
        let user_id = "5b12287a9217ec0c481447b5";

        operationDao.create({
            user_id: user_id,
            picture: picture_id,
            vote: {},
        }, (err, res) => {
        });
    });


    router.get('/delVote', (req, res) => {
        let picture_id = req.query.Picture_id;
        let user_id = "5b12287a9217ec0c481447b5";
        operationDao.remove({
            user_id: user_id,
            picture: picture_id,
            vote:{$exists:true},
        }, (err, res) => {
        });
    })
    return router;
};
