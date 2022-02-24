const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderitemSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
})

const Orderitem = mongoose.model('Orderitem', OrderitemSchema)
module.exports = Orderitem