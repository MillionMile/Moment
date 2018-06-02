const app = require('express');
const operationDao = require("../dao/OperationDao.js");
module.exports = function () {
    let router = app.Router();

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
