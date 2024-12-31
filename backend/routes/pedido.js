const router = require("express").Router()

const pedidoController = require("../controllers/pedidoController");

router.route("/pedido").post((req, res) => pedidoController.create(req,res));

router.route("/pedido").get((req,res) => pedidoController.getAll(req,res));


module.exports = router;