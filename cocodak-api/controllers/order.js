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
 const Order = require('../models/Order')
 const Orderitem = require('../models/Orderitem')


const getOrder = async (req, res, next) => {
    const order = await Order.findById(req.value.params.orderID)

    return res.status(200).json(order)
}

const getOrder_Orderitem = async (req, res, next) => {
    const { orderID } = req.value.params

    // Get cart
    const order = await Order.findById(orderID).populate('orderitem')

    return res.status(200).json(order.orderitem)
 }


const newOrderitem = async (req, res, next) => {
    const { orderID } = req.value.params

    // Create a new cart item
    const newOrderitem = new Orderitem(req.value.body)

    // Get cart
    const order = await Order.findById(orderID)

    // Assign category as a product's owner_category
    newOrderitem.order = order

    const product = await Product.findById(newOrderitem.product)

    newOrderitem.total = (newOrderitem.quantity * product.price).toFixed(2)

    // Save the product
    await newOrderitem.save()
    const user = await User.findById(order.user)
    console.log(user)
    const cart = await Cart.findById(user.cart)
    console.log(cart)
    const cartitem = await Cartitem.findOne({cart: cart._id, product: product._id})
    cart.cartitem.pull(cartitem._id)
    cart.total = (cart.total - cartitem.total).toFixed(2)
    await cart.save()
    await cartitem.remove()

    // Add product to category's products array 'products'
    order.orderitem.push(newOrderitem._id)

    // Save the category
    await order.save()

 
    return res.status(201).json(newOrderitem)
 }

const index = async (req, res, next) => {
    const order = await Order.find({})

    return res.status(200).json(order)
}

const updateOrder = async (req, res, next) => {
    const { orderID } = req.value.params
    const newOrder = req.value.body
    const result = await Order.findByIdAndUpdate(orderID, newOrder)
    // Check if put category, remove product in category's model
    return res.status(200).json(result)
}

const deleteOrder = async (req, res, next) => {
    const { orderID } = req.value.params

    const order = await Order.findById(orderID)
    const user = await User.findById(order.user)
    user.order.pull(order._id)
    user.save()
    const orderitemID = order.orderitem
    await order.remove()

    for (item in orderitemID){
        const orderitem = await Orderitem.findById(orderitemID[item])
        await orderitem.remove()
    }
    
    return res.status(200).json({success: true})
}


module.exports = {
    getOrder,
    getOrder_Orderitem,
    newOrderitem,
    index,
    deleteOrder,
    updateOrder
}