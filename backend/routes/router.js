const router = require("express").Router()

const productRouter = require("./product")
const vendedorRouter = require("./vendedor")
const pedidoRouter= require("./pedido")
const acertoRouter= require("./acerto")


router.use("/", productRouter);
router.use("/", vendedorRouter);
router.use("/", pedidoRouter);
router.use("/", acertoRouter);

module.exports = router;
