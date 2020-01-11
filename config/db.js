const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () =>{
    try{
        await mongoose.connect(db,{ useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true,dbName: "pizzabot" });

        console.log("Connected to remote db...");
    }catch (e) {
        console.error(e);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;