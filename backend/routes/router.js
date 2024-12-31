const router = require("express").Router()

const productRouter = require("./product")
const vendedorRouter = require("./vendedor")
const pedidoRouter= require("./pedido")


router.use("/", productRouter);
router.use("/", vendedorRouter);
router.use("/", pedidoRouter);

module.exports = router;
