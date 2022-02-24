const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartitemSchema = new Schema({

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
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

const Cartitem = mongoose.model('Cartitem', CartitemSchema)
module.exports = Cartitem