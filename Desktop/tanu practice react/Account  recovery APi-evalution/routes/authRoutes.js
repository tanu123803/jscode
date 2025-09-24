const express = require("express")
const { register, login } = require("../controllers/AuthControllers")

const router = express.router()

router.post("/register",register)
router.post("/login",login)



module.exports = router