const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderitem: [{
        type: Schema.Types.ObjectId,
        ref: 'Orderitem'
    }],
    total: {
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default: "Xử lí"
    },
    name:{
        type: String
    },
    address:{
        type: String
    },
    phone: {
        type: String
    },
    ship: {
        type: Number,
        default: 3.0
    },
    total_all:{
        type: Number,
        default: 0.0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order