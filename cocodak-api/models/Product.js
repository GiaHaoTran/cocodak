const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    timing: {
        type: String,
        default: "8h00 - 21h45"
    },
    rating: {
        type: Number,
        default: 4.9
    },
    popular: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    owner_category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product