const joi = require('joi');


exports.validateSignUp = (req, res, next) => {
    const schema = {
        name : joi.string().min(4).required(),
        phone: joi.string().regex(/^(0)(70|80|81|90)(\d{8})$/).required(),
        email: joi.string().email().required(),
        address: joi.string().regex(/\d/).required(),
        password: joi.string().regex(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])^\S{8,}$/).required(),
        confirmPassword:joi.string().regex(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])^\S{8,}$/).required()
    }

    const result = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success:false, message: result.error.message});
    if(req.body.password !== req.body.confirmPassword)  return res.status(400).send({success:false, message: "The passwords sent do not match"});
    next();
}


exports.validateLogin = (req, res, next) => {
    const  schema = {
        email: joi.string().email().required(),
        password: joi.string().regex(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])^\S{8,}$/).required()
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return  res.status(400).send({success:false, message: result.error.message});
    next();
}

exports.validateFood = (req, res, next)=>{
    const schema = {
        name: joi.string().min(3).required(),
        price: joi.number().required()
    }
    const result  = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success: false, message: result.error.message})
    next();
}
exports.validateFoodName = (req, res, next)=> {
    const schema = {
        name: joi.string().min(3).required(),
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success: false, message: "Name of food is required and should be a string of length not less than 3"});
    next();
}

exports.validateEmail = (req, res, next) => {
    const schema = {
        email : joi.string().email().required()
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success: false, message: result.error.message});
    next();
}

exports.validateCart = (req, res, next) => {
    const schema = {
        email : joi.string().email().required(),
        name: joi.string().min(3).required(), 
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success: false, message: result.error.message});
    next();
}

exports.quantityChange = (req, res, next) => {
    const schema = {
        name: joi.string().min(3).required(),
        quantity: joi.number().integer().required()
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({success: false, message: result.error.message});
    next();
}