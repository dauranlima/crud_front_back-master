const mongoose = require("mongoose");

const { Schema } = mongoose;

const vendedorSchema = new Schema({
  nome:{
    type: String,
    required: true
  },
  endereco:{
    type: String,
    required: true
  },
  telefone:{
    type: Number,
  },
  documento:{
    type: String,
    required: true
  },
  cidade:{
    type: String,
    required: true
  }
}, { timestamps: true}
);

const Vendedor = mongoose.model("Vendedor", vendedorSchema)

module.exports = {
  Vendedor,
  vendedorSchema,
}