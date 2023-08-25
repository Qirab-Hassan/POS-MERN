const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Connect_DB = require('./config/config');
const ItemModel = require('./models/ItemModel');
const items = require('./utils/Data');
require('colors');

//Configurations
dotenv.config();
Connect_DB();

//Seeder Function 
const ImportData = async () => {
    try{
        const ItemData = await ItemModel.insertMany(items);
        console.log("All Items Added" .bgGreen);
        console.log(ItemData);
        process.exit(); 
    } catch (error) {
        console.log(`${error}` .bgRed.inverse);
        process.exit(1);
    }
};
ImportData();




