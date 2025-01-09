const router = require("express").Router()

const acertoController = require("../controllers/acertoController");

router.route("/acerto").post((req, res) => acertoController.create(req,res));

router.route("/acerto").get((req,res) => acertoController.getAll(req,res));

router.route("/acerto/:id").get((req,res) => acertoController.get(req,res));

router.route("/acerto/:id").delete((req,res) => acertoController.delete(req,res));

router.route("/acerto/:id").put((req,res) => acertoController.update(req,res));


module.exports = router;