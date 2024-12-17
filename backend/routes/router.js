const router = require("express").Router()

const productRouter = require("./product")
const vendedorRouter = require("./vendedor")


router.use("/", productRouter);
router.use("/", vendedorRouter);

module.exports = router;
