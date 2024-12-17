const mongoose = require("mongoose")


const { Schema } = mongoose;

const productSchema = new Schema({
  nome:{
    type: String,
    require,
  },
  preco:{
    type: Number,
    require,

  }
  
}, { timestamps: true}
);

const Product = mongoose.model("Product", productSchema)

module.exports = {
  Product,
  productSchema,
}