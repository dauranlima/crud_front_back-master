const mongoose = require("mongoose");

const { Schema } = mongoose;

const pedidoSchema = new Schema({
  produtos:[{
    nome: String,
    quantity: Number,
    preco: Number,
  }],
  vendedor: { type: String },
  data:{ type: Date},
  totalValor: { type: Number },
  
}, { timestamps: true}
);

const Pedido = mongoose.model("Pedido", pedidoSchema)

module.exports = {
  Pedido,
  pedidoSchema,
}
