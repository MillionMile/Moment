const app = require('../app')
const request = require('supertest')(app)
const assert = require('assert')
const userDao = require('../dao/userDao')
const fs = require('fs')
const path = require('path')

describe('/user', () => {

    const username = '1234567'
    const password = '123456'
    const confirm = '123456'
    let sessionId

    after('remove user', async () => {
        await userDao.removeUsers()
    })

    describe('create user', () => {

        it('should success', async () => {

            await request
                .post('/user/createUser')
                .send({ username, password, confirm })
                .expect({
                    result: 1
                })
        })

        it('should faild for duplicated username', async () => {
            await request
                .post('/user/createUser')
                .send({ username, password, confirm })
                .expect({
                    result: -1
                })
        })

    })

    describe('login', () => {

        it('should success', async () => {

            const res = await request
                .post('/user/login')
                .send({ username, password })
                .expect({ result: 1 })

            const setCookie = res.header['set-cookie'][0]
            assert(setCookie)

            sessionId = /^connect.sid=([^;]*)/.exec(setCookie)[0]
            assert(sessionId)
        })

        it('should faild', async () => {

            const wrongPassword = '123'

            await request
                .post('/user/login')
                .send({ username, password: wrongPassword })
                .expect({ result: -1 })

        })

    })

    describe('upload avatar', () => {

        it('should success', async () => {

            const filePath = path.resolve(__dirname, '../public/img/avatar.jpg')
            const fileBuffer = fs.readFileSync(filePath)

            await request
                .post('/user/avatar')
                .attach('avatar', filePath)
                .set('cookie', sessionId)
                .expect({ result: 1 })
        })

    })

    describe('get avatar', () => {

        it('should success', async () => {

            const res = await request
                .get('/user/avatar')
                .set('cookie', sessionId)
            assert(typeof res.body.result === 'string')
        })

    })

})

