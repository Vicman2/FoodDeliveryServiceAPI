const mongoose = require('mongoose');

const Schema = mongoose.Schema

const menuSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    isAvailable:{
        type: Boolean ,
        default: true
    }
}, {timestamp: true})


menuSchema.statics.findFood =async function(name){
    try {
        const food = await this.model('menu').findOne({name: name});
        if(!food) return false;
        return food; 
    } catch (err) {
        console.log(err)
    }
}

menuSchema.methods.addFood = async function(){
    try{
        const exist = await  this.model("menu").findOne({name: this.name})
        if(exist) return false;
        await this.save();
        return true;
    }catch(err){
        console.log(err);
    }
}

menuSchema.statics.viewMenu = async function(){
    try{
        const any = await this.model("menu").find().select("-_id  -__v")
        if(any) return any
    }catch(err){
        console.log(err)
    }
}

menuSchema.statics.editPrice = async function(foodName, price){
    try{
        const toEditPrice = await this.model('menu').findOne({name: foodName});
        if(!toEditPrice) return false;
        toEditPrice.price= price;
        await toEditPrice.save();
        return true;
    }catch(err){
        console.log(err)
    }
}

menuSchema.statics.deleteFood = async function(name){
    try {
        const food = await this.model('menu').findOne({name: name});
        if(!food) return false;
        await this.model('menu').findOneAndDelete({name: name});
        return true
    } catch (err) {
        console.log(err)
    }
}

menuSchema.statics.makeUnavailable = async function(name){
    try {
        const food = await this.model('menu').findOne({name: name});
        if(!food) return false;
        food.isAvailable = false;
        await food.save();
        return true
    } catch (err) {
        console.log(err)
    }
}

menuSchema.statics.makeAvailable = async function(name){
    try {
        const food = await this.model('menu').findOne({name: name});
        if(!food) return false;
        food.isAvailable = true;
        await food.save();
        return true
    } catch (err) {
        console.log(err);
    }
}

//Display all the food
//Edit price
// Remove food
//Make food unavailable



module.exports = mongoose.model('menu', menuSchema);