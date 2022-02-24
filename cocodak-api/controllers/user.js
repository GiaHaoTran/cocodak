/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const User = require('../models/User')
 const Cart = require('../models/Cart')
 const Product = require('../models/Product')
const Order = require('../models/Order')
const Orderitem = require('../models/Orderitem')
const Cartitem = require('../models/Cartitem')
const nodemailer = require('nodemailer')

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

 const getUser = async (req, res, next) => {
    const { userID } = req.value.params

    const user = await User.findById(userID)

    return res.status(200).json(user)
 }

 const getUserCart = async (req, res, next) => {
    const { userID } = req.value.params

    // Get user
    const user = await User.findById(userID).populate('cart')

    return res.status(200).json({cart: user.cart})
 }
 const getFavorite = async (req, res, next) => {
     const {userID} = req.value.params
     const user = await User.findById(userID).populate('favorite')
     return res.status(200).json(user.favorite)
 }

 const getItemFavorite = async (req, res, next) => {
     const {favoriteID} = req.value.params
     const product = await Product.findById(favoriteID)
     return res.status(200).json(product)
 }

 const newFavorite = async (req, res, next) => {
     const {userID} = req.value.params
     const user = await User.findById(userID)
     //const product_id = Product.findById(req.value.body)
     const product_id = req.value.body.favorite
     const product = await Product.findById(product_id)
     if (product._id in user.favorite)
     {
        return res.status(304).json({success: "Food Exits"})
     }
     else {
        user.favorite.push(product_id)
        await user.save()

        return res.status(200).json(user.favorite)
     }
 }

 const deleteFavorite = async (req, res, next) => {
    const {userID} = req.value.params
    const user = await User.findById(userID)
    const {favoriteID} = req.value.params
    user.favorite.pull(favoriteID)
    await user.save()

    return res.status(200).json(user.favorite)
 }

const index = async (req, res, next) => {
    const users = await User.find({})

    return res.status(200).json(users)
}

const newUser = async (req, res, next) => {
    // Create User
    const id  = req.value.body["email"]
    const check = await User.findOne({email: id})
    console.log(id, check)
    if (check != null){
        return res.status(304).json({success: "Account Exists"})
    }
    else{
        const newUser = new User(req.value.body)
        // Create Cart
        const newCart = new Cart({
            "user_id": newUser._id
        })
        // Save cart
        await newCart.save()
        newUser.cart = newCart._id
        // Save user
        await newUser.save()
        return res.status(201).json(newUser)
    }
}

const deleteUser = async (req, res, next) => {
    const { userID } = req.value.params
 
     // Get a user
     const user = await User.findById(userID)

     // Get a cart

     const cart = await Cart.findById(user.cart)
     const cartitem_id = cart.cartitem
     for (item in cartitem_id){
        const cartitem = await Cartitem.findById(cartitem_id[item])
        await cartitem.remove()
    }
     const order = user.order
     for (item1 in order){
         const order_id = await Order.findById(order[item1])
         const orderitem_id = order_id.orderitem
         for (item2 in orderitem_id){
            const orderitem = await Orderitem.findById(orderitem_id[item2])
            await orderitem.remove()
        }
        await order_id.remove()
     }

     // Remove the user, cart
     await user.remove()
     await cart.remove()
     await order.remove()

     return res.status(200).json({ success: true })
}


const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({success: true})
}

const updateUser = async (req, res, next) => {
    // number of fields
    const { userID } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({success: true})
}

const getOrder = async (req, res, next) => {
    // number of fields
    const {userID} = req.value.params
     const user = await User.findById(userID).populate('order')
     return res.status(200).json(user.order)
}

const newOrder = async (req, res, next) => {
    // Find user
    const {userID} = req.value.params
    const user = await User.findById(userID)
 
    // Create a new order
 
     const newOrder = new Order(req.value.body)
     newOrder.total_all = (newOrder.total + 3).toFixed(2)
     newOrder.user = user._id
     await newOrder.save()
 
     // Add newly created product to the actual products
     user.order.push(newOrder._id)
     await user.save()
    return res.status(200).json(newOrder)
}

const forgotuser = async (req, res, next) => {
    const email = req.value.body["email"]
    const newpass = makeid()
    const user = await User.findOne({email: email})
    if (user == null)
    {
        console.log("k tồn tại mail")
        return res.status(403).json({success: false})
    }
    else{
        //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
        var transporter =  nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cocodak.food@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'Duy08122001' //Mật khẩu tài khoản gmail vừa tạo
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
        
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'cocodak.food@gmail.com',
            to: email,
            subject: 'Forgot Password',
            text: 'Hello '+ email + ',' + '\n\n' + 'Your new password is' + newpass //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        }
        transporter.sendMail(mainOptions, function(err, info){    
            if (err) {
                console.log(err);  
            }
        });
        user.password = newpass
        await user.save()
        return res.status(201).json({success: true})
    }
}


module.exports = {
    getUser,
    index,
    newUser,
    replaceUser,
    updateUser,
    deleteUser,
    getUserCart,
    newFavorite,
    getFavorite,
    deleteFavorite,
    getItemFavorite,
    getOrder,
    newOrder,
    forgotuser
}