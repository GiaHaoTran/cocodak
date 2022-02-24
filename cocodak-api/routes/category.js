const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const CategoryController = require('../controllers/category')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(CategoryController.index)
    .post(validateBody(schemas.categorySchema), CategoryController.newCategory)

router.route('/:categoryID')
    .get(validateParam(schemas.idSchema, 'categoryID'), CategoryController.getCategory)
    .put(validateParam(schemas.idSchema, 'categoryID'), validateBody(schemas.categorySchema), CategoryController.replaceCategory)
    .patch(validateParam(schemas.idSchema, 'categoryID'), validateBody(schemas.categorySchema), CategoryController.updateCategory)
    .delete(validateParam(schemas.idSchema, 'categoryID'), CategoryController.deleteCategory)

router.route('/:categoryID/products')
    .get(validateParam(schemas.idSchema, 'categoryID'), CategoryController.getCategoryProducts)
    .post(validateParam(schemas.idSchema, 'categoryID'), validateBody(schemas.productSchema), CategoryController.newCategoryProduct)

module.exports = router