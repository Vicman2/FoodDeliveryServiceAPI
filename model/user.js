const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT =  require('jsonwebtoken');
const foodModel = require('../model/menu');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    cart: [
        {
            foodId : {type: Schema.Types.ObjectId, ref: 'menu', required: true},
            quantity: {type: Number, required: true}, 
        }
    ]
},{timestamps: true})


userSchema.methods.signUp= async function(){
    try{
        const userExists = await this.model('user').findOne({email: this.email});
        if(userExists) return false;
        const hashedPassword = await bcrypt.hash(this.password,12);
        this.password = hashedPassword;
        console.log(this)
        const saved = await this.save();
        console.log(saved)
        return true
    }catch(err){
        console.log(err);
    }
}

userSchema.statics.logIn = async function(email, password){
    try{
        const userExists = await this.model('user').findOne({email: email});
        if(!userExists) return {message: "no User with this email", success: false}
        const checkValidPassword = await bcrypt.compare(password, userExists.password);
        if(!checkValidPassword) return {message:"Invalid password", status: false};
        const token = JWT.sign({email:userExists.email, isAdmin: userExists.isAdmin}, process.env.myTokenPrivateKey);
        return {message : "confirmed", "x-access-token": token};
    }catch(err){
        console.log(err);
    }
}

userSchema.statics.makeAdmin = async function(email){
    try {
        const user = await this.model('user').findOne({email: email})
        if(!user) return false;
        user.isAdmin = true;
        await user.save();
        return true;
    } catch (err) {
        console.log(err)
    }
}
userSchema.statics.unmakeAdmin = async function(email){
    try {
        const user = await this.model('user').findOne({email: email})
        if(!user) return false;
        user.isAdmin = false;
        await user.save();
        return true;
    } catch (err) {
        console.log(err)
    }
}

userSchema.statics.addToCart = async function(foodName, email){
    try {
        const food = await foodModel.findFood(foodName);
        if(!food) return {success: false, message: "food does not exist"};
        const user = await this.model('user').findOne({email: email})
        if(!user) return {success: false, message: "User does not exist"};
        let existingItem;

    
        for(let i = 0; i < user.cart.length ; i++){
            if(user.cart[i].foodId == String( food._id)){
                existingItem = true;
            }
        }
        if(existingItem) return {success: false, message: "Food  already exist in the cart"}
        user.cart.push({foodId: food._id, quantity: 1})
        await user.save();
        return {success: true, message: "Added to cart" };
    } catch (err) {
        console.log(err)
    }
}

userSchema.statics.removeFromCart =  async function(foodName, email){
    try {
        const food = await foodModel.findFood(foodName);
        if(!food) return {success: false, message: "food does not exist"};
        const user = await this.model('user').findOne({email: email})
        if(!user) return {success: false, message: "User does not exist"};
        let existingItem;
        for(let i = 0; i < user.cart.length ; i++){
            if(user.cart[i].foodId == String( food._id)){
                existingItem = true;
                existingItemIndex = i
            }
        }
        if(existingItem){
            user.cart.splice(existingItemIndex, 1);
             await user.save();
            return {success: true, message: "Item have been removed successfully from the cart"};
        }else{
            return {success: false, message: "Item Is not in cart "}
        }
    }catch(err){
        console.log(err);
    }
}

userSchema.statics.changeQuantity= async function(foodName, quantity, email){
    try {
        const food = await foodModel.findFood(foodName);
        if(!food) return {success: false, message: "food does not exist"};
        const user = await this.model('user').findOne({email: email})
        if(!user) return {success: false, message: "User does not exist"};
        let existingItem;
        for(let i = 0; i < user.cart.length ; i++){
            if(user.cart[i].foodId == String( food._id)){
                existingItem = true;
                existingItemIndex = i
            }
        }
        if(existingItem){
            quantity = Number(quantity)
            if(quantity == 0){
            user.cart.splice(existingItemIndex, 1)
             await user.save();
            return {success: true, message: " Item have been removed from the cart"}
            }
            user.cart[existingItemIndex].quantity = quantity
            await user.save();
            return {success: true, message: "Food quantity have been incremented"};
        }else{
            return {success: false, message: "Item is not in the cart"};
        }
    } catch (err) {
        console.log(err);
    }
}
userSchema.statics.viewCart = async function(email){
    const userCart =  await this.model('user').findOne({email: email})
                                                                     .populate('menu')
                                                                     .select("cart");
    if(!userCart) return {success: false, message: "User does not exist"};
    if(userCart.length === 0) return {success: true, message: "Your cart is empty"};
    return {success: true, data: userCart};
}

module.exports = mongoose.model('user', userSchema)