const mongoose = require("mongoose");
const { productSchema } = require("./product");


const { Schema } = mongoose;

const vendedorSchema = new Schema({
  nome:{
    type: String,
    required: true
  },
  rua:{
    type: String,
    required: true
  },
  numero:{
    type: Number,
  },
  cidade:{
    type: String,
    required: true
  },
  imagem:{
    type: String,
    required: true
  },
  observacao:{
    type: String,
    required: true
  },
  produtos: {
    type:[productSchema],
  },
  
}, { timestamps: true}
);

const Vendedor = mongoose.model("Vendedor", vendedorSchema)

module.exports = {
  Vendedor,
  vendedorSchema,
}