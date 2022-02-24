const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const UserController = require('../controllers/user')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')
const User = require('../models/User')

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser)

router.route('/forgot')
    .post(validateBody(schemas.forgotSchema), UserController.forgotuser)

router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
    .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)
    .delete(validateParam(schemas.idSchema, 'userID'), UserController.deleteUser)

router.route('/:userID/cart')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserCart)


router.route('/:userID/favorite')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getFavorite)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.favoriteSchema), UserController.newFavorite)

router.route('/:userID/favorite/:favoriteID')
    .get(validateParam(schemas.idSchema, 'userID'), validateParam(schemas.idSchema, 'favoriteID'), UserController.getItemFavorite)
    .delete(validateParam(schemas.idSchema, 'userID'), validateParam(schemas.idSchema, 'favoriteID'), UserController.deleteFavorite)

router.route('/:userID/order')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getOrder)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.orderSchema), UserController.newOrder)

module.exports = router