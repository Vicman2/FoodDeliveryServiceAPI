const express = require('express');

const router = express.Router();

const validationMiddleware = require('../middlewares/validations');
const authMiddleware = require('../middlewares/auth')
const userController = require('../controller/userController');

// routes for ordinary users
router.post('/signUp', validationMiddleware.validateSignUp, userController.signUp);
router.post('/logIn', validationMiddleware.validateLogin, userController.logIn)
router.put('/add-to-cart',validationMiddleware.validateFoodName, authMiddleware.checkUser, userController.addToCart);
router.delete('/remove-from-cart', validationMiddleware.validateFoodName, authMiddleware.checkUser, userController.removeFromCart);
router.put('/change-quantity', validationMiddleware.quantityChange, authMiddleware.checkUser, userController.changeQuantity);
router.get('/view-cart', authMiddleware.checkUser, userController.viewCart);

// routes for admin
router.put("/make-admin", validationMiddleware.validateEmail, authMiddleware.checkAdmin, userController.makeAdmin);
router.put("/unmake-admin", validationMiddleware.validateEmail, authMiddleware.checkAdmin, userController.unmakeAdmin);



module.exports = router