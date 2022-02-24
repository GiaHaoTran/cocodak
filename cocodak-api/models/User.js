const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String
    },
    fullname:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    address: {
        type: String
    },
    avatar: {
        type: String
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User