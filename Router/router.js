const { singup, login } = require("../controllers/userControllrs");
const { createProduct } = require("../controllers/productController");
const { getProduct } = require("../controllers/productController");

const { isValid } = require("../middleware/jwt");
const { createOrder, findYourOrder } = require("../controllers/orderController");

const router = require("express").Router();

router.post("/register",singup);
router.post("/login", login);
router.post("/create-product", isValid, createProduct);
router.get("/get-product", isValid, getProduct);
router.post("/create-order", isValid, createOrder);
router.get("/my-order", isValid, findYourOrder);


module.exports = router;