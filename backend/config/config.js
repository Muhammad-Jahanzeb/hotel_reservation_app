const mongoose = require('mongoose')
require("dotenv").config()

const config = async() =>{
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log('Connected to mongoDB.')
    }catch(err){
        throw err
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Database disconnected.")
})

mongoose.connection.on("connected",()=>{
    console.log("Database reconnected.")
})

module.exports = config