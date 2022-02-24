const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const LoginController = require('../controllers/login')

const { validateBody, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .post(validateBody(schemas.loginSchema), LoginController.loginUser)

module.exports = router