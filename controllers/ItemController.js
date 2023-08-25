const ItemModel = require('../models/ItemModel');

//get items
const getItemController = async (req,resp) => {
    try {
        const items = await ItemModel.find();
        resp.status(200).send(items);

    } catch(error)
    {
        console.log(error);
    }
};

//add items
const addItemController = async (req,resp) => {
    try{
        const newItem = new ItemModel(req.body);
        await newItem.save();
        resp.status(201).send("Item Created Successfully !");
    } catch(error)
    {
        resp.status(400).send("error",error);
        console.log(error);
    }
};

//update item
const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await ItemModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });

    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await ItemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("Item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = {getItemController , addItemController , editItemController ,deleteItemController}; 