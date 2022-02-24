const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const CartitemController = require('../controllers/cartitem')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(CartitemController.index)

router.route('/:cartitemID')
    .get(validateParam(schemas.idSchema, 'cartitemID'), CartitemController.getCartitem)
    .put(validateParam(schemas.idSchema, 'cartitemID'), CartitemController.replaceCartitem)
    .patch(validateParam(schemas.idSchema, 'cartitemID'), CartitemController.updateCartitem)
    .delete(validateParam(schemas.idSchema, 'cartitemID'), CartitemController.deleteCartitem)

module.exports = router