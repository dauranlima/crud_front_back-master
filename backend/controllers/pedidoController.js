const {Pedido: PedidoModel } = require("../models/pedido")

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

  // get: async(req,res) =>{
  //   try {
  //     const id = req.params.id
  //     const product = await ProductModel.findById(id);
      
  //     if(!product){
  //       res.status(404).json({msg:"Produto não encontrado."})
  //       return;
  //     }
  //     res.json(product)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },

  // delete: async(req,res) => {
  //   try {
  //     const id = req.params.id
  //     const product = await ProductModel.findById(id);

  //     if(!product){
  //       res.status(404).json({msg:"Produto não encontrado."})
  //       return;
  //     }

  //     const deletedProduct = await ProductModel.findByIdAndDelete(id)
  //     res.status(200).json({deletedProduct, msg: "Produto excluido com sucesso!"})

  //   } catch (error) {
  //     console.log(error)
  //   }
  // },

  // update: async (req,res) => {

  //   try {
      
  //     const id = req.params.id;

  //     const product = {
  //       nome: req.body.nome,
  //       preco: req.body.preco,
  //       codigo: req.body.codigo,
  //       // descricao: req.body.descricao,
  //       // categoria: req.body.categoria,
  //       // quantidade: req.body.quantidade,
  //       // tamanho:req.body.tamanho,
  //       // imagem:req.body.imagem,
  //     };

  //     const updatedProduct = await ProductModel.findByIdAndUpdate(id, product)

  //     if(!updatedProduct){
  //       res.status(404).json({msg:"Serviço não encontrado."})
  //       return;
  //     }
      
  //     res.status(200).json({product, msg: "Produto atualizado com sucesso!"})

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

}

module.exports = pedidoController;