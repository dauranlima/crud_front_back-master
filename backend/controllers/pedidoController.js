const {Pedido: PedidoModel, Pedido } = require("../models/pedido")

const pedidoController = {

  create: async(req,res) => {
    try {

      const novoPedido = {
				produtos: [...req.body.produtos],
				vendedor: {...req.body.vendedor},
        data: req.body.data,
				totalValor: req.body.totalValor,
      }

			const response = await PedidoModel.create(novoPedido);
      res.status(201).json({response, msg:"produto cadastrado com sucesso."});
      console.log(response)
    } catch (error) {
      res.status(400).json(
        {msg: "Erro ao cadastrar produto", error: error.message}
      )
    }
  },
  getAll: async(req,res) => {
    try {
      const pedidos = await PedidoModel.find();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({error,
        msg: "Erro ao buscar pedidos"
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

module.exports = pedidoController;