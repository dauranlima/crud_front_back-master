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
        saldoAntigo: req.body.saldoAntigo,
				percentual: req.body.percentual,
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
      const acerto = await AcertoModel.findById(id);
      
      if(!acerto){
        res.status(404).json({msg:"Acerto não encontrado."})
        return;
      }
      res.json(acerto)
    } catch (error) {
      console.log(error)
    }
  },

  delete: async(req,res) => {
    try {
      const id = req.params.id
      const AcertoModel = await AcertoModel.findById(id);

      if(!AcertoModel){
        res.status(404).json({msg:"Acerto não encontrado."})
        return;
      }

      const deleteAcerto = await AcertoModel.findByIdAndDelete(id)
      res.status(200).json({deleteAcerto, msg: "Acerto excluido com sucesso!"})

    } catch (error) {
      console.log(error)
    }
  },

  update: async (req,res) => {

    try {
      
      const id = req.params.id;

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
				saldoAntigo: req.body.saldoAntigo,
        percentual: req.body.percentual,
      }

      const updatedAcerto = await AcertoModel.findByIdAndUpdate(id, novoAcerto)

      if(!updatedAcerto){
        res.status(404).json({msg:"Acerto não encontrado."})
        return;
      }
      
      res.status(200).json({novoPedido, msg: "Acerto atualizado com sucesso!"})

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = acertoController;