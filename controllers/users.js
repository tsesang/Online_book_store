// const userModel = require("../models/models")
// const bcrypt = require('bcrypt')
// const products = require("../models/products")
// const cart = require("../models/cart")

// const register = async (req, res) => {

//     const userexits = await userModel.findOne({email : req.body.email})

//     if(userexits){
//         return res.render('register', {msg : "User with this email already exists!!"})
//     }

//     if(req.body.password == req.body.cpassword){

//         // finally we can create an entry
//         const hashPass = await bcrypt.hash(req.body.password, 10)

//         // we are creating an entry
//         userModel.create({fullname : req.body.fullname,
//             email : req.body.email,
//             password : hashPass})

//         return res.render('register', {msg : "Account Successfully Created!!!"})
            
//     }
//     else{
//         return res.render('register', {msg : "Both passwords do not Match!!!"}) 
//     }

// }








// const login = async (req, res)=>{
//     //email valiadation
//     const accountExist = await userModel.findOne({email : req.body.email})
//     if(accountExist){
//         //password validation
//         const correct = await bcrypt.compare(req.body.password, accountExist.password)
//         if(correct){
//             //  start the session
//             req.session.email = req.body.email
//             return res.redirect('/')
//         }
//         return res.render('login', {message: "Invalid Password !!" })
//     }
//     else{
//         return res.render('login', {message : "Invalid Email !!"})
//     }
//     //start the session

//     //index view
// }


// const logout = (req, res) => {
//     req.session.email = false // logged out
//     return res.redirect('/')
// }


// const add_to_cart = async (req, res) => {
//     const pro_id = req.params.pid
//     if(req.session.email){
//         // yes somebody has logged in we can add pro to cart
//         const proObj = await products.findOne({_id : pro_id})
//         cart.create({
//             email : req.session.email,
//             p_name : proObj.p_name,
//             p_des : proObj.p_des,
//             price : proObj.price,
//             image : proObj.image
//         })
//         return res.redirect('/')
        

//     }
//     else{
//         // nobody has logged in redirect to login
//         return res.redirect('/login')
//     }
// }



// module.exports = {register, login, logout, add_to_cart}

