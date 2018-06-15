const { Router } = require('express')
const userDao = require('../dao/userDao')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const path = require('path')

module.exports = function () {
	const router = Router()
	router.post('/createUser', (req, res) => {
		const { username, password, confirm } = req.body
		if (password !== confirm) {
			res.send('两次输入的密码不一样')
		}

		userDao.createUser(username, password, (err, user) => {
			if (err) {
				return res.send({ result: -1 })
			}

			res.send({ result: 1 })

		})
	})

	router.post('/login', (req, res) => {
		const { username, password } = req.body
		userDao.findUserByUsername(username, (err, user) => {

			if (err || !user) {
				return res.send({ result: -1 })
			}

			if (user.password !== password) {
				return res.send({ result: -1 })
			}

			req.session.regenerate((err) => {
				if (err) res.send({ result: -1 })
				const { username, _id: user_id } = user
				Object.assign(req.session, { username, user_id })
				res.send({ result: 1 })
			})
		})
	})

	router.post('/avatar', upload.single('avatar'), (req, res) => {
		const base64Url = req.file.buffer.toString('base64')
		const formattedUrl = 'data:' + req.file.mimetype + ';base64,' + base64Url

		userDao.findUserById(req.session.user_id, (err, user) => {
			if (err || !user) return res.send({ result: -1 })

			user.avatar = formattedUrl
			user.save(err => {
				if (err) return res.send({ result: -1 })
				res.send({ result: 1 })
			})
		})

	})

	router.get('/avatar', (req, res) => {
		userDao.findUserById(req.session.user_id, (err, user) => {
			if (err) return res.send({ result: -1 })
			res.send({ result: user.avatar })
		})
	})
	return router
}