const router = require("express").Router()


const productController = require("../controllers/productController");

router.route("/produtos").post((req, res) => productController.create(req,res));

router.route("/produtos").get((req,res) => productController.getAll(req,res));

router.route("/produtos/:id").get((req,res) => productController.get(req,res));

router.route("/produtos/:id").delete((req,res) => productController.delete(req,res));

router.route("/produtos/:id").put((req,res) => productController.update(req,res));


module.exports = router;