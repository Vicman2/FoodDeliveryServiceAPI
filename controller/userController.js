const userModel = require("../model/user");

//==============================================================//
exports.signUp = async (req, res, next)=>{
        const {name, phone, email, address, password} = req.body
    
        const user = new userModel({
            name: name,
            phone: phone,
            email:email,
            address: address,
            password: password
        })
    
        const validProduct = await user.signUp();
        if(!validProduct) return res.status(201).send({success: false, message: "User already exist"}) ;
        res.send({success: true, message: "SignedUp Successfully"}) ;
}


exports.logIn  = async (req, res, next) => {
    const {email, password} = req.body;
    const messageObject =await userModel.logIn(email, password);
    if(messageObject.message !== "confirmed") return res.status(202).send(messageObject);
    res.send(messageObject)
}

exports.addToCart = async (req, res, next) => {
    const {name} = req.body;
    const {email } = req 
    const resultObject = await userModel.addToCart( name, email);
    if(!resultObject.success ) return res.status(400).send(resultObject);
    res.status(201).send(resultObject);
}

exports.removeFromCart = async (req, res, next) => {
        const {name} = req.body;
        const {email} = req
        const resultObject = await  userModel.removeFromCart(name, email);
        if(!resultObject.success ) return res.status(400).send(resultObject);
        res.status(201).send(resultObject);
}

exports.changeQuantity  = async(req, res, next) => {
        const {name, quantity} = req.body;
        const {email} = req;
        const result = await userModel.changeQuantity(name, quantity, email);
        if(!result.success) return res.status(400).send(result)
        res.status(200).send(result);
}

exports.viewCart = async (req, res, next) => {
    const {email} = req;
    const result = await userModel.viewCart(email);
    if(!result.success)  return res.status(400).send(result);
    return res.status(200).send(result);
}


// ===============================================================//
// End of all users                                                                                                                                     //
//===============================================================//


//Admin

exports.makeAdmin = async (req, res, next) => {
    const {email} = req.body;
    const result = await userModel.makeAdmin(email);
    if(!result) return res.status(404).send({success: false, message: "User not found"});
    res.status(201).send({success: true, message: "User have been made admin"});
}

exports.unmakeAdmin = async (req, res, next) => {
    const {email} = req.body;
    const result = await userModel.unmakeAdmin(email);
    if(!result) return res.status(404).send({success: false, message: "User not found"});
    res.status(201).send({success: true, message: "Role of admin have been removed from user"});
}



