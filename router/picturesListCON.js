const app = require('express');
const pictureDao = require("../dao/pictureDao");
const operationDao = require("../dao/operationDao.js");
const userDao = require("../dao/userDao.js");
const folderDao = require('../dao/folderDao')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = function () {
	let router = app.Router();

	// 上传图片
	router.post('/uploadPic', upload.single('picture'), (req, res) => {

		const { title, abstract } = req.body

		const base64Url = req.file.buffer.toString('base64')
		const formattedUrl = 'data:' + req.file.mimetype + ';base64,' + base64Url

		const Picture = pictureDao
		const newPicture = new Picture({
			title, abstract, path: formattedUrl
		})

		newPicture.save(err => {
			if (err) return res.send({ result: -1 })
			operationDao.PictureIssue(req.session.user_id, newPicture._id,
				(err) => {
					if (err) return res.send({ result: -1 })
					res.send({ result: 1 })
				}
			)
		})
	})

	// 删除图片
	router.delete('/removePic', (req, res) => {
		const { id } = req.query
		pictureDao.removePicture(id, (err) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}

			operationDao.OperationsAllDeleteByPicture(id, (err) => {
				if (err) {
					console.log(err)
					return res.send({ result: -1 })
				}

				res.send({ result: 1 })

			})

		})

	})

	//在个人中心处删除图片
	router.post('/removePic', (req, res) => {
		const { id } = req.query
		pictureDao.removePicture(id, (err) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}
			operationDao.OperationsAllDeleteByPicture(id, (err) => {
				if (err) {
					console.log(err)
					return res.send({ result: -1 })
				}
				res.send({ result: 1 })
			})
		})
	})

	// 更新图片描述
	router.post('/updatePicAbstract', (req, res) => {
		const { abstract, id } = req.body
		pictureDao.AbstractUpdate(id, abstract, (err) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}
			res.redirect('/picturesList/pictureManage?pictureId='+id)
		})
	})

	// 获取图片详情
	router.get('/getPicDetail', (req, res) => {
		const { id } = req.query
		pictureDao.findOne({ _id: id }, (err, picture) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}

			res.send({ result: picture })

		})
	})

	// 获取个人的图片列表
	router.get('/getPicList', (req, res) => {

		const { user_id: id } = req.session

		operationDao.getPersonalPictureList(id, (err, operations) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}

			const pictureList = operations.map(operation => {
				return operation.picture
			})

			res.send({ result: pictureList })
		})
	})

	// 获取最新的图片
	router.get('/getLatestPics', (req, res) => {

		// TODO:预留做分页
		const { page } = req.query

		// 最新的图片数量
		const numOfpics = 10

		operationDao.getLatestPictures(numOfpics, async (err, operations) => {
			if (err) {
				console.log(err)
				return res.send({ result: -1 })
			}

			operations = await Promise.all(operations.map(operation => {
				return operation
					.populate({
						path: 'picture'
					})
					.execPopulate()
			}))

			const pictures = operations.map(operation => {
				return operation.picture
			})

			res.send({ result: pictures })

		})


	})
  
  router.get('/trendingPic',(req,res)=>{
        res.render("trendingPic")
    })

    router.get('/getTrendingPic',(req,res)=>{
        pictureDao.Pictures((err,data)=>{
            (function iterator(i) {
                if(i===data.length){
                    res.json(data)
                    return
                }
                operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                    {vote:{$exists:true}}, (err,result1)=>{
                        operationDao.OperationsCount({user_id:req.session['user_id']},data[i]._id,
                            {favor:{$exists:true}}, (err,result2)=>{
                                operationDao.UsersOfVote(data[i]._id, (err, dataCount) =>{
                                    data[i]._doc.voteCount=dataCount.length
                                    data[i]._doc.isVote=result1
                                    data[i]._doc.isFavor=result2
                                iterator(i+1)
                                })
                            })
                        })
            })(0)
        })
    })
                
    router.get('/picInFolder',(req,res)=>{
        res.render("picturesListInFolder",{
            folderId: req.query.folderId
        })
    })
           
    router.get('/getPicInFolder',(req,res)=>{
        operationDao.PicturesOfFavor(req.session["user_id"],req.query.folderId,(err,result)=>{
            res.json(result)
        })
    })

    router.get('/favorFolders',(req,res)=>{
        res.render("favorsList");
    })

    router.get('/getFavorFolders',(req,res)=>{
        userDao.findUFoldersById(req.session["user_id"],(err,result)=>{
            res.json(result.folders)
        })
    })

    router.get('/searchPicture',(req,res)=>{
        pictureDao.FindByTagNAbstract(req.query.keyword,(err, data) => {
            if(!data||data.length===0){
                res.json(false)
                return
            }
            (function iterator(i) {
                if (i === data.length) {
                    res.json(data)
                    return
                }
                operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                    { vote: { $exists: true } }, (err, result1) => {
                        operationDao.OperationsCount({ user_id: req.session['user_id'] }, data[i]._id,
                            { favor: { $exists: true } }, (err, result2) => {
                                operationDao.UsersOfVote(data[i]._id, (err, dataCount) => {
                                    data[i]._doc.voteCount = dataCount.length
                                    data[i]._doc.isVote = result1
                                    data[i]._doc.isFavor = result2
                                    iterator(i + 1)
                                })
                            })
                    })
            })(0)
        })
    })

    //---------新增------------
    router.get('/discover',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("discover")
    })

    router.get('/getDiscover',(req,res)=>{

    })

    router.get('/freshNew',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("freshNew")
    })
   
    router.get('/getFreshNew',(req,res)=>{

    })

    router.get('/rank',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("rank")
    })

    router.get('/getRank',(req,res)=>{

    })

    router.get('/pictureManage',(req,res)=>{
    //编辑自己上传的某张图片  picture_id
    //仅链接页面，未添加功能
        res.render("pictureManage");
    })
    
    router.get('/pictureManage', (req, res) => {
	pictureDao.findOne({ _id: req.query.pictureId }, (err, picture) => {
	    console.log(picture);
	    res.render("pictureManage", picture);
	})
    })

	return router;
};
