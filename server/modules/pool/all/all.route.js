const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const cors = require("cors");
const allController=require('./all.controller')

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.get("/all/:id",allController.getAll);

module.exports = router;
