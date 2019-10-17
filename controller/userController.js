const userModel = require("../model/user");
const menuModel = require("../model/menu")

//==============================================================//
exports.signUp = async (req, res, next)=>{
    try{
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
    }catch(err){
        console.log(err)
    }
}


exports.logIn  = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const messageObject =await userModel.logIn(email, password);
        if(messageObject.message !== "confirmed") return res.status(202).send(messageObject);
        res.send(messageObject)
    }catch(err){
        console.log(err);
    }
}

// ===============================================================//
// End of all users                                                                                                                                     //
//===============================================================//


//Admin

