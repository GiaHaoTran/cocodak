const Joi = require('@hapi/joi')
const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

const schemas = {

    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    //------- Category ---------

    categorySchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        picture: Joi.string().required()

    }),

    categoryOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3),
        picture: Joi.string()

    }),


    //------- Product ---------


    productSchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0.0).required(),
        image: Joi.string().required(),
        timing: Joi.string().required(),
        rating: Joi.number().required(),
        popular: Joi.boolean().required(),
        status: Joi.boolean().required(),
    }),

    productOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3),
        description: Joi.string().min(10),
        price: Joi.number().min(0.0),
        image: Joi.string(),
        timing: Joi.string(),
        rating: Joi.number(),
        popular: Joi.boolean(),
        status: Joi.boolean(),
        owner_category: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),

    newProductSchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0.0).required(),
        image: Joi.string().required(),
        timing: Joi.string().required(),
        rating: Joi.number().required(),
        popular: Joi.boolean().required(),
        status: Joi.boolean().required(),
        owner_category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),


    //------- Cart Item -------


    newCartitemSchema: Joi.object().keys({
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        quantity: Joi.number().required(),
        total: Joi.number(),
        cart: Joi.string()
        
    }),


    //-------- Order ---------

    
    orderSchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.string().max(10).required(),
        address: Joi.string().min(10).required(),
        total: Joi.number().min(0.0).required(),
        status: Joi.string(),
        ship: Joi.number(),
        total_all: Joi.number()
    }),

    orderupdateSchema: Joi.object().keys({
        name: Joi.string().min(3),
        phone: Joi.string().max(10),
        address: Joi.string().min(10),
        total: Joi.number().min(0.0),
        status: Joi.string().min(0),
        ship: Joi.number().min(0.0),
        total_all: Joi.number().min(0.0),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),


    //--------- Order Item ---------


    orderitemSchema: Joi.object().keys({
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        quantity: Joi.number().required(),
        total: Joi.number(),
        order: Joi.string()
        
    }),


    //------- User ---------
    

    userSchema: Joi.object().keys({
        fullname: Joi.string().min(6).required(),
        phone: Joi.string().max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        avatar: Joi.string(),
        address: Joi.string().min(10)
    }),

    userOptionalSchema: Joi.object().keys({
        fullname: Joi.string().min(6),
        phone: Joi.string().max(10),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        avatar: Joi.string(),
        address: Joi.string().min(10)

    }),

    favoriteSchema: Joi.object().keys({
        favorite: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    // ------ Login -------
    loginSchema: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),

    forgotSchema: Joi.object().keys({
        email: Joi.string().required()
    }),
}

module.exports = {
    validateBody,
    validateParam,
    schemas
}