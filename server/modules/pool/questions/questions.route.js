const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const verifyToken = require("../../../middlewares/verifyToken");
const cors = require("cors");
const questionsController = require("./questions.controller");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.get('/q', verifyToken, questionsController.getQuestions);
router.get('/q/:id', verifyToken, questionsController.getQuestionById);
router.post('/q', verifyToken, questionsController.createQuestion);
router.put('/q/:id', verifyToken, questionsController.updateQuestion);
router.delete('/q/:id', verifyToken, questionsController.deleteQuestion);

module.exports = router;
