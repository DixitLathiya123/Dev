const UserRouter = require("./router")
const router = require("express").Router();

router.use("/v1", UserRouter)
module.exports = router