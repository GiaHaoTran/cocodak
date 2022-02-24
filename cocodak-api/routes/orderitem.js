const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const OrderitemController = require('../controllers/orderitem')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(OrderitemController.index)

router.route('/:orderitemID')
    .get(validateParam(schemas.idSchema, 'orderitemID'), OrderitemController.getOrderitem)
    .put(validateParam(schemas.idSchema, 'orderitemID'), OrderitemController.replaceOrderitem)
    .patch(validateParam(schemas.idSchema, 'orderitemID'), OrderitemController.updateOrderitem)
    .delete(validateParam(schemas.idSchema, 'orderitemID'), OrderitemController.deleteOrderitem)

module.exports = router