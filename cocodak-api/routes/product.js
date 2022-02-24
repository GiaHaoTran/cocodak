const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const ProductController = require('../controllers/product')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(ProductController.index)
    .post(validateBody(schemas.newProductSchema), ProductController.newProduct)

router.route('/:productID')
    .get(validateParam(schemas.idSchema, 'productID'), ProductController.getProduct)
    .put(validateParam(schemas.idSchema, 'productID'), validateBody(schemas.newProductSchema), ProductController.replaceProduct)
    .patch(validateParam(schemas.idSchema, 'productID'), validateBody(schemas.productOptionalSchema), ProductController.updateProduct)
    .delete(validateParam(schemas.idSchema, 'productID'), ProductController.deleteProduct)

module.exports = router