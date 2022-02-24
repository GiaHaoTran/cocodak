const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    cartitem: [{
        type: Schema.Types.ObjectId,
        ref: 'Cartitem'
    }],
    total: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart