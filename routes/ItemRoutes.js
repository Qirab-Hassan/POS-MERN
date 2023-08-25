const express = require('express');
const { getItemController, addItemController , editItemController ,deleteItemController } = require('../controllers/ItemController');
const router = express.Router();

//Routes
//Method - GET
router.get('/get-item',getItemController);
//Method - POST
router.post('/add-item',addItemController);
//method - PUT
router.put("/edit-item", editItemController);
//method - DELETE
router.post("/delete-item", deleteItemController);


module.exports = router;