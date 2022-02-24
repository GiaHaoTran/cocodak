const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const CartController = require('../controllers/cart')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(CartController.index)

router.route('/:cartID')
    .get(validateParam(schemas.idSchema, 'cartID'), CartController.getCart)

router.route('/:cartID/cartitem')
    .get(validateParam(schemas.idSchema, 'cartID'), CartController.getCart_Cartitem)
    .post(validateParam(schemas.idSchema, 'cartID'), validateBody(schemas.newCartitemSchema), CartController.newCartitem)

module.exports = router