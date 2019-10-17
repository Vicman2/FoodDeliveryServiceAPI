const menuModel = require("../model/menu");
exports.viewMenu = async (req, res, next)=> {
    try {
        const menu = await menuModel.viewMenu();
        if(!menu) return res.status(404).send({status: true, message: "No food was found in the menu"});
        return res.status(200).send({status: true, data: menu});
    } catch (err) {
        console.log(err)
    }
}

exports.addFood = async (req, res, next)=>{
    try {
        const {name, price} = req.body;
        const foodie = new menuModel({
            name: name,
            price: price
        })
        const validFood =await  foodie.addFood();
        if(!validFood)   return res.status(400).send({success: false, message: "Food already exist"})
        res.status(201).send({success: true, message:"Food created successfully"})
    } catch (err) {
        console.log(err);
    }
}

exports.editPrice = async (req, res, next) => {
    try{
        const {name, price} = req.body;
        const result = await menuModel.editPrice(name, price);
        if(!result) return res.status(400).send({status: false, message: "Food does not exist"});
        res.status(200).send({success: true, message: "Price have been updated successfully"});
    }catch(err){
        console.log(err);
    }
}



exports.deleteFood = async (req, res, next) => {
    try {
        const {name} = req.body;
        const result = await menuModel.deleteFood(name);
        if(!result) return res.status(400).send({success: false, message: "Food does not exist"});
        res.status(200).send({success: true, message: "Food deleted successfully"});
    } catch (err) {
        console.log(err);
    }
}

exports.makeFoodUnavailable = async(req, res, next) => {
    try{
        const {name} = req.body;
        const result = await menuModel.makeUnavailable(name);
        if(!result) return res.status(400).send({success: false, message: "Food does not exist"});
        res.status(200).send({success: true, message: "Food have been made unavailable"});
    }catch(err){
        console.log(err)
    }
}

exports.makeAvailable = async(req, res, next) => {
    try{
        const {name} = req.body;
        const result = await menuModel.makeAvailable(name);
        if(!result) return res.status(400).send({success: false, message: "Food does not exist"});
        console
        res.status(200).send({success: true, message: "Food have been made available"});
    }catch(err){
        console.log(err);
    }
}