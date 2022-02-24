/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Product = require('../models/Product')
 const Category = require('../models/Category')
 
 const deleteProduct = async (req, res, next) => {
     const { productID } = req.value.params
 
     // Get a product
     const product = await Product.findById(productID)
     const owner_categoryID = product.owner_category
 
     // Get a owner_category
     const owner_category = await Category.findById(owner_categoryID)
 
     // Remove the product
     await product.remove()
 
     // Remove product from owner_category's products list
     owner_category.products.pull(product)
     await owner_category.save()
 
     return res.status(200).json({ success: true })
 }
 
 const getProduct = async (req, res, next) => {
     const product = await Product.findById(req.value.params.productID)
 
     return res.status(200).json(product)
 }
 
 const index = async (req, res, next) => {
     const products = await Product.find({})
 
     return res.status(200).json(products)
 }
 
 const newProduct = async (req, res, next) => {
    // Find owner_category
    const owner_category = await Category.findById(req.value.body.owner_category)
 
    // Create a new product
     const product = req.value.body
     delete product.owner_category
 
     product.owner_category = owner_category._id
     const newProduct = new Product(product)
     await newProduct.save()
 
     // Add newly created product to the actual products
     owner_category.products.push(newProduct._id)
     await owner_category.save()
 
     return res.status(201).json(newProduct)
 }
 
 const replaceProduct = async (req, res, next) => {
     const { productID } = req.value.params
     const newProduct = req.value.body
     const result = await Product.findByIdAndUpdate(productID, newProduct)
     // Check if put category, remove product in category's model
     return res.status(200).json(result)
 }
 
 const updateProduct = async (req, res, next) => {
     const { productID } = req.value.params
     const newProduct = req.value.body
     const result = await Product.findByIdAndUpdate(productID, newProduct)
     // Check if put category, remove product in category's model
     return res.status(200).json(result)
 }
 
 module.exports = {
     deleteProduct,
     getProduct,
     index,
     newProduct,
     replaceProduct,
     updateProduct
 }