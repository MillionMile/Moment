const request = require('../util/request')
const assert = require('assert')
const userDao = require('../dao/userDao')
const pictureDao = require('../dao/pictureDao')
const operationDao = require('../dao/operationDao')
const path = require('path')

const username = '1234567'
const password = '123456'
const confirm = '123456'
let sessionId, pictureId

const title = '阿吉好帅啊'
let abstract = '阿吉好帅啊啊啊啊啊啊'

describe('/picture', () => {

	after('remove user and picture', async () => {
		await userDao.removeUsers()
		await pictureDao.remove({})
		await operationDao.remove({})
	})

	before('create user and login and initialize session id', async () => {

		// create user
		await createUser()

		// login and initialize session id
		await login()
	})

	describe('upload picture', () => {

		it('should success', async () => {

			const filePath = path.resolve(__dirname, '../public/img/avatar.jpg')
			const res = await request
				.post('/picturesList/uploadPic')
				.field('title', title)
				.field('abstract', abstract)
				.attach('picture', filePath)
				.set('cookie', sessionId)

			assert(res.body.result.title === title)
			assert(res.body.result.abstract === abstract)

			pictureId = res.body.result._id
		})

	})

	describe('update picture\'s abstract', () => {

		it('should success', async () => {

			abstract = '阿吉是最棒的！'

			const res = await request
				.post('/picturesList/updatePicAbstract')
				.send({ id: pictureId, abstract })
				.set('cookie', sessionId)
				.expect({ result: 1 })

		})

	})

	describe('get personal picture list', () => {

		it('should success', async () => {

			const res = await request
				.get('/picturesList/getPicList')
				.set('cookie', sessionId)


			assert(res.body.result instanceof Array)
			assert(res.body.result.length === 1)

		})

	})

	describe('get picture\'s detail', () => {

		it('should success', async () => {

			const res = await request
				.get('/picturesList/getPicDetail')
				.query({ id: pictureId })
				.set('cookie', sessionId)

			assert(res.body.result.title === title)
			assert(res.body.result.abstract === abstract)

		})

	})

	describe('get 10 latest picture', () => {

		it('should success', async () => {

			const res = await request
				.get('/picturesList/getLatestPics')
				.set('cookie', sessionId)

			assert(res.body.result instanceof Array)
			assert(res.body.result.length === 1)

		})

	})

	describe('remove picture', () => {

		it('should success', async () => {

			const res = await request
				.delete('/picturesList/removePic')
				.query({ id: pictureId })
				.set('cookie', sessionId)
				.expect({ result: 1 })

		})

	})


})

async function createUser() {
	await request
		.post('/user/createUser')
		.send({ username, password, confirm })
		.expect({
			result: 1
		})
}

async function login() {
	const res = await request
		.post('/user/login')
		.send({ username, password })

	assert(res.text !== '')

	const setCookie = res.header['set-cookie'][0]
	assert(setCookie)

	sessionId = /^connect.sid=([^;]*)/.exec(setCookie)[0]
	assert(sessionId)
}