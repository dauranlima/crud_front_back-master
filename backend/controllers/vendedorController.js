const {Vendedor: VendedorModel } = require("../models/vendedor")

const vendedorController = {

  create: async(req,res) => {
    try {
      const vendedor = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        documento: req.body.documento,
        cidade: req.body.cidade,
      }
      
      const response = await VendedorModel.create(vendedor);
      res.status(201).json({response, msg:"vendedor cadastrado com sucesso."});
    } catch (error) {
      console.log(error)
    }
  },

  getAll: async(req,res) => {
    try {
      const vendedor = await VendedorModel.find();
      res.json(vendedor);
    } catch (error) {
      console.log(error)
    }
  },

  get: async(req,res) =>{
    try {
      const id = req.params.id
      const vendedor = await VendedorModel.findById(id);
      
      if(!vendedor){
        res.status(404).json({msg:"Vendedor não encontrado."})
        return;
      }
      res.json(vendedor)
    } catch (error) {
      console.log(error)
    }
  },

  delete: async(req,res) => {
    try {
      const id = req.params.id
      const vendedor = await VendedorModel.findById(id);

      if(!vendedor){
        res.status(404).json({msg:"Vendedor não encontrado."})
        return;
      }

      const deletedVendedor = await VendedorModel.findByIdAndDelete(id)
      res.status(200).json({deletedVendedor, msg: "Vendedor excluido com sucesso!"})

    } catch (error) {
      console.log(error)
    }
  },

  update: async (req,res) => {

    try {
      
      const id = req.params.id;

      const vendedor = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        documento: req.body.documento,
        cidade: req.body.cidade,
      };

      const updatedVendedor = await VendedorModel.findByIdAndUpdate(id, vendedor)

      if(!updatedVendedor){
        res.status(404).json({msg:"Vendedor não encontrado."})
        return;
      }
      
      res.status(200).json({vendedor, msg: "Vendedor atualizado com sucesso!"})

    } catch (error) {
      console.log(error)
    }

  }

}

module.exports = vendedorController;