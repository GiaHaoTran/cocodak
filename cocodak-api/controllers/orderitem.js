/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Product = require('../models/Product')
 const Orderitem = require('../models/Orderitem')
 const Order = require('../models/Order')

 const getOrderitem = async (req, res, next) => {
    const { orderitemID } = req.value.params

    const orderitem = await Orderitem.findById(orderitemID).populate('product')

    return res.status(200).json({orderitem})
 }


const index = async (req, res, next) => {
    const orderitem = await Orderitem.find({})

    return res.status(200).json(orderitem)
}



const replaceOrderitem = async (req, res, next) => {
    // enforce new orderitem to old orderitem
    const { orderitemID } = req.value.params

    const newOrderitem = req.value.body

    const result = await Orderitem.findByIdAndUpdate(orderitemID, newOrderitem)

    return res.status(200).json(result)
}

const updateOrderitem = async (req, res, next) => {
    // number of fields
    const { orderitemID } = req.value.params

    const newOrderitem = req.value.body

    total_old = newOrderitem.total

    const result = await Orderitem.findByIdAndUpdate(orderitemID, newOrderitem)

    const product = Product.findById(result.product)

    var total = result.quantity * product.price

    result.total = total

    result.save()

    order = Order.findById(result.order)
    order.total = order.total - total_old + total
    order.save()

    return res.status(200).json(result)
}

const deleteOrderitem = async (req, res, next) => {
    const { orderitemID } = req.value.params
 
    // Get a order item
    const orderitem = await Orderitem.findById(orderitemID)
    const owner_orderID = orderitem.order

    // Get a owner_category
    const owner_order = await Order.findById(owner_orderID)

    // Remove the product
    await orderitem.remove()

    // Remove product from owner_category's products list
    owner_order.orderitem.pull(orderitem)
    await owner_order.save()


    return res.status(200).json({ success: true })
}

module.exports = {
    getOrderitem,
    index,
    replaceOrderitem,
    updateOrderitem,
    deleteOrderitem
}