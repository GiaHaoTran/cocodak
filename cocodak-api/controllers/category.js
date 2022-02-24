/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Product = require('../models/Product')
 const Category = require('../models/Category')

 const getCategory = async (req, res, next) => {
    const { categoryID } = req.value.params

    const category = await Category.findById(categoryID)

    return res.status(200).json(category)
 }

 const getCategoryProducts = async (req, res, next) => {
    const { categoryID } = req.value.params

    // Get category
    const category = await Category.findById(categoryID).populate('products')

    return res.status(200).json(category.products)
 }

const index = async (req, res, next) => {
    const categories = await Category.find({})

    return res.status(200).json(categories)
}

const newCategory = async (req, res, next) => {
    const newCategory = new Category(req.value.body)

    await newCategory.save()

    return res.status(201).json(newCategory)
}

const newCategoryProduct = async (req, res, next) => {
    const { categoryID } = req.value.params

    // Create a new product
    const newProduct = new Product(req.value.body)

    // Get category
    const category = await Category.findById(categoryID)

    // Assign category as a product's owner_category
    newProduct.owner_category = category

    // Save the product
    await newProduct.save()

    // Add product to category's products array 'products'
    category.products.push(newProduct._id)

    // Save the category
    await category.save()

    res.status(201).json(newProduct)
}

const replaceCategory = async (req, res, next) => {
    // enforce new category to old category
    const { categoryID } = req.value.params

    const newCategory = req.value.body

    const result = await Category.findByIdAndUpdate(categoryID, newCategory)

    return res.status(200).json(result)
}

const updateCategory = async (req, res, next) => {
    // number of fields
    const { categoryID } = req.value.params

    const newCategory = req.value.body

    const result = await Category.findByIdAndUpdate(categoryID, newCategory)

    return res.status(200).json(result)
}

const deleteCategory = async (req, res, next) => {
    const { categoryID } = req.value.params

    const category = await Category.findById(categoryID)
    const productID = category.products
    await category.remove()

    for (item in productID){
        const product = await Product.findById(productID[item])
        await product.remove()
    }
    
    return res.status(200).json({success: true})
}

module.exports = {
    getCategory,
    getCategoryProducts,
    index,
    newCategory,
    newCategoryProduct,
    replaceCategory,
    updateCategory,
    deleteCategory
}