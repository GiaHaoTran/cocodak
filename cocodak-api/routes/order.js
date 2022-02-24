const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const OrderController = require('../controllers/order')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(OrderController.index)

router.route('/:orderID')
    .get(validateParam(schemas.idSchema, 'orderID'), OrderController.getOrder)
    .patch(validateParam(schemas.idSchema, 'orderID'), validateBody(schemas.orderupdateSchema), OrderController.updateOrder)
    .delete(validateParam(schemas.idSchema, 'orderID'), OrderController.deleteOrder)

router.route('/:orderID/orderitem')
    .get(validateParam(schemas.idSchema, 'orderID'), OrderController.getOrder_Orderitem)
    .post(validateParam(schemas.idSchema, 'orderID'), validateBody(schemas.orderitemSchema), OrderController.newOrderitem)

module.exports = router