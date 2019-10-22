const express = require('express');

const router = express.Router();

const validationMiddleware = require('../middlewares/validations');
const authMiddleware = require('../middlewares/auth');
const foodController = require('../controller/foodController');

router.post('/addFood', validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.addFood);
router.get("/menu", foodController.viewMenu);
router.put("/edit-price", validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.editPrice);
router.delete("/delete-food", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.deleteFood);
router.put("/make-food-unavailable", validationMiddleware.validateFoodName,authMiddleware.checkAdmin, foodController.makeFoodUnavailable);
router.put("/make-food-available", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.makeAvailable);

module.exports = router;