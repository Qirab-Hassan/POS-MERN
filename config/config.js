const mongoose = require('mongoose');
require('colors');

//Connect DataBase Function

const Connect_DB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${connect.connection.host}` .bgYellow);
    } catch(error) {
        console.log(`Error : ${error.message}` .bgRed);
        process.exit(1);
    }
};

//Exporting Module
module.exports = Connect_DB;
