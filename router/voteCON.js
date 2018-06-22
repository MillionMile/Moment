const app = require('express')
const operationDao = require("../dao/operationDao.js")

module.exports=function () {
    let router=app.Router()

    router.get('/addVote', (req, res) => {//创建点赞(user_id,pictureId)
        let pictureId = req.query.pictureId
        let user_id = req.session['user_id']

        operationDao.PictureVote(user_id,pictureId,(err, result) => {
            res.send({result:1})
        })
    })

    router.get('/delVote', (req, res) => {//取消点赞(user_id,pictureId)
        let pictureId = req.query.pictureId
        let user_id = req.session['user_id']
        operationDao.remove({
            user_id: user_id,
            picture: pictureId,
            vote:{$exists:true},
        }, (err, result) => {
            res.send({result:1})
        })
    })

    return router
}