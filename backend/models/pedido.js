const mongoose = require("mongoose");

const { Schema } = mongoose;

const pedidoSchema = new Schema({

  produtos: [{
    nome: String,
    quantity: Number,
    preco: Number,
  }],
  vendedor: { 
			id: { type: String },
    nome: { type: String },
    cidade: { type: String },
    saldo: {type: Number},
  },  
  data: { type: Date },
  totalValor: { type: Number },
  obs: {
    obs: { type: String },
  }
  

}, { timestamps: true })


const Pedido = mongoose.model("Pedido", pedidoSchema)

module.exports = {
  Pedido,
  pedidoSchema,
}
