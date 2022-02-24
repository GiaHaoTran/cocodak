const User = require('../models/User')

const loginUser = async (req, res, next) => {
    const email = req.value.body["email"]
    const password = req.value.body["password"]
    console.log(email, password)
    const user = await User.find({email: email, password: password})
    /*for (item in user)
    {
        console.log("1",item.value)
        if (values["email"] == email && values["password"] == password){
            console.log(values)
            x = true
            break;
        }
    }*/
    return res.status(200).json(user)
}

module.exports = {
    loginUser
}