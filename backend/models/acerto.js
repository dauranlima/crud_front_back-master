const mongoose = require("mongoose");

const { Schema } = mongoose;

const acertoSchema = new Schema({

  pedidoId: {type:String },
  produtos: [{
    id: { type: String },
    nome: { type: String },
    quantity: { type: Number },
    devolvido: { type: Number },
    preco: { type: Number },
  }],
  vendedor: {
    id: { type: String },
    nome: { type: String },
    cidade: { type: String },
    saldo: { type: Number },
  },
  dataAcerto: { type: Date },
  totalValor: { type: Number },
  totalVendido: {type:Number },
  descontos: {type:Number },
  saldoAtual: {type:Number },
  totalAcerto:{type:Number },
  recebido: {type:Number },
  novoSaldoVendedor: {type: Number },

}, { timestamps: true })


const Acerto = mongoose.model("Acerto", acertoSchema)

module.exports = {
  Acerto,
  acertoSchema,
}
