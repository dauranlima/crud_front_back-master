const {Acerto: AcertoModel, Acerto } = require("../models/acerto")

const acertoController = {

  create: async(req,res) => {
    try {

      const novoAcerto = {
				pedidoId: req.body.pedidoId,
				produtos: [...req.body.produtos],
				vendedor: {...req.body.vendedor},
        dataAcerto: req.body.dataAcerto,
				totalValor: req.body.totalValor,
				totalVendido: req.body.totalVendido,
				descontos: req.body.descontos,
				saldoAtual: req.body.saldoAtual,
				recebido: req.body.recebido,
				totalAcerto: req.body.totalAcerto,
				novoSaldoVendedor: req.body.novoSaldoVendedor,
				observacao: req.body.observacao,
      }

			const response = await AcertoModel.create(novoAcerto);
      res.status(201).json({response, msg:"acerto realizado com sucesso."});
      console.log(response)
    } catch (error) {
      res.status(400).json(
        {msg: "Erro ao realizar o acerto", error: error.message}
      )
    }
  },
  getAll: async(req,res) => {
    try {
      const acertos = await AcertoModel.find();
      res.json(acertos);
    } catch (error) {
      res.status(500).json({error,
        msg: "Erro ao buscar acertos"
      })
    }
  },

  get: async(req,res) =>{
    try {
      const id = req.params.id
      const pedido = await PedidoModel.findById(id);
      
      if(!pedido){
        res.status(404).json({msg:"Pedido não encontrado."})
        return;
      }
      res.json(pedido)
    } catch (error) {
      console.log(error)
    }
  },

  delete: async(req,res) => {
    try {
      const id = req.params.id
      const pedido = await PedidoModel.findById(id);

      if(!pedido){
        res.status(404).json({msg:"Pedido não encontrado."})
        return;
      }

      const deletedOrder = await PedidoModel.findByIdAndDelete(id)
      res.status(200).json({deletedOrder, msg: "Pedido excluido com sucesso!"})

    } catch (error) {
      console.log(error)
    }
  },

  update: async (req,res) => {

    try {
      
      const id = req.params.id;

      const novoPedido = {
        produtos: [...req.body.produtos],
				vendedor: {...req.body.vendedor},
        data: req.body.data,
				totalValor: req.body.totalValor,
      }

      const updatedOrder = await PedidoModel.findByIdAndUpdate(id, novoPedido)

      if(!updatedOrder){
        res.status(404).json({msg:"pedido não encontrado."})
        return;
      }
      
      res.status(200).json({novoPedido, msg: "Pedido atualizado com sucesso!"})

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = acertoController;