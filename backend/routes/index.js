const express = require("express");
const router = express.Router();
const userauth = require("./user");
const accountRouter = require("./bank");

router.use("/user", userauth);
router.use("/account", accountRouter);
module.exports = router;
//  /api/v1/user
//  /api/v1/transaction ...