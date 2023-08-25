const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { bgCyan } = require('colors');
require('colors');
const Connect_DB = require('./config/config')

//dotenv Config
dotenv.config();

//Config DataBase
Connect_DB();

//Rest Object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/items",require("./routes/ItemRoutes"));

//Port
const PORT = process.env.PORT || 4500;

//Listen
app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});


