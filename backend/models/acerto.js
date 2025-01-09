const mongoose = require("mongoose");

const { Schema } = mongoose;

const acertoSchema = new Schema({

  pedidoId: {type:String },
  vendedor: { 
    nome: { type: String },
    cidade: { type: String },
  },
  dataAcerto: { type: Date },
  totalValor: { type: Number },
  totalVendido: {type:Number },
  descontos: {type:Number },
  saldoAtual: {type:Number },
  recebido: {type:Number },
  totalAcerto:{type:Number },
  novoSaldoVendedor: {type: Number },

}, { timestamps: true })


const Acerto = mongoose.model("Acerto", acertoSchema)

module.exports = {
  Acerto,
  acertoSchema,
}
