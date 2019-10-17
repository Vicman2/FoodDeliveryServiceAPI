const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT =  require('jsonwebtoken');

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
    }
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
        const token = JWT.sign({id:userExists.email, isAdmin: userExists.isAdmin}, process.env.myTokenPrivateKey);
        return {message : "confirmed", "x-access-token": token};
    }catch(err){
        console.log(err);
    }
}

// userSchema.statics.makeAdmin = async 

module.exports = mongoose.model('user', userSchema)