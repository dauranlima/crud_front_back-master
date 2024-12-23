const mongoose = require("mongoose");

const { Schema } = mongoose;

const pedidoSchema = new Schema({
  nome:{
    type: String,
    required: true
  },
  cidade:{
    type: String,
    required: true
  },
  produtos:{
    type: Array,
    required: true
  }
}, { timestamps: true}
);

const Pedido = mongoose.model("Pedido", vendedorSchema)

module.exports = {
  Pedido,
  pedidoSchema,
}