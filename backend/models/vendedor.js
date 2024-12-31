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
    type: String,
  },
  documento:{
    type: String,
    required: true
  },
  cidade:{
    type: String,
    required: true
  },
		saldo: {
			type: Number,
			required: true,
		},
	}, { timestamps: true}
);

const Vendedor = mongoose.model("Vendedor", vendedorSchema)

module.exports = {
  Vendedor,
  vendedorSchema,
}