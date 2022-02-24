/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Cart = require('../models/Cart')
 const User = require('../models/User')
 const Cartitem = require('../models/Cartitem')
const Product = require('../models/Product')



const getCart = async (req, res, next) => {
    const cart = await Cart.findById(req.value.params.cartID)

    return res.status(200).json(cart)
}

const getCart_Cartitem = async (req, res, next) => {
    const { cartID } = req.value.params

    // Get cart
    const cart = await Cart.findById(cartID).populate('cartitem')

    return res.status(200).json(cart.cartitem)
 }

const newCartitem = async (req, res, next) => {
    const { cartID } = req.value.params
    const id = req.value.body["product"]
    const check = await Cartitem.findOne({cart: cartID, product: id})
    console.log(check)
    if (check != null) {

        const cart = await Cart.findById(cartID)
        const x = cart.total - check.total
        check.quantity += Number(req.value.body["quantity"])
        const product = await Product.findById(id)
        check.total = (check.quantity * product.price).toFixed(2)
        cart.total = (x + parseFloat(check.total)).toFixed(2)
        await check.save()
        await cart.save()
        return res.status(201).json(check)
    }
    else{

        // Create a new cart item
        const newCartitem = new Cartitem(req.value.body)

        // Get cart
        const cart = await Cart.findById(cartID)

        // Assign category as a product's owner_category
        newCartitem.cart = cart

        product = await Product.findById(newCartitem.product)

        newCartitem.total = (newCartitem.quantity * product.price).toFixed(2)

        // Save the product
        await newCartitem.save()

        // Add product to category's products array 'products'
        cart.cartitem.push(newCartitem._id)
        cart.total += newCartitem.total

        // Save the category
        await cart.save()
        return res.status(201).json(newCartitem)
    }

 }

const index = async (req, res, next) => {
    const cart = await Cart.find({})

    return res.status(200).json({cart})
}




module.exports = {
    getCart,
    newCartitem,
    getCart_Cartitem,
    index,
}