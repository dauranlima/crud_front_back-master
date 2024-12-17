const router = require("express").Router()


const vendedorController = require("../controllers/vendedorController");

router.route("/vendedor").post((req, res) => vendedorController.create(req,res));

router.route("/vendedor").get((req,res) => vendedorController.getAll(req,res));

router.route("/vendedor/:id").get((req,res) => vendedorController.get(req,res));

router.route("/vendedor/:id").delete((req,res) => vendedorController.delete(req,res));

router.route("/vendedor/:id").put((req,res) => vendedorController.update(req,res));


module.exports = router;