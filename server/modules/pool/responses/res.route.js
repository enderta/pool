const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const cors = require("cors");
const questionsController = require("./res.controller");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.get('/res',  questionsController.getRes);
router.get('/res/:id',  questionsController.getResById);
router.post('/res', verifyToken, questionsController.createRes);
router.put('/res/:id', verifyToken, questionsController.updateRes);
router.delete('/res/:id', verifyToken, questionsController.deleteRes);


module.exports = router;