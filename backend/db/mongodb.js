const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config()

USER = process.env.USERNAME;
PASS = process.env.PASSWORD;

async function main(){
  try {
    await mongoose.connect(`mongodb://localhost:27017/dbPedidos`)
    console.log("db_connected!!!")
  } catch (error) {
    console.log(`Error:${error}`)
  }
}

module.exports = main


// await mongoose.connect(`mongodb+srv://dauranlima:auclm722@cluster0.el7cayl.mongodb.net/?retryWrites=true&w=majority`)
// await mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.el7cayl.mongodb.net/?retryWrites=true&w=majority`)
// 