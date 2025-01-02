const router = require("express").Router()

const pedidoController = require("../controllers/pedidoController");

router.route("/pedido").post((req, res) => pedidoController.create(req,res));

router.route("/pedido").get((req,res) => pedidoController.getAll(req,res));

router.route("/pedido/:id").get((req,res) => pedidoController.get(req,res));

router.route("/pedido/:id").delete((req,res) => pedidoController.delete(req,res));

router.route("/pedido/:id").put((req,res) => pedidoController.update(req,res));


module.exports = router;