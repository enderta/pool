const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const cors = require("cors");
const voteController = require("./vote.controller");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

//get all questions

router.get("/votes",  voteController.getVotes);

//get a question by id

router.get("/votes/:id", voteController.getVote);

//create a question

router.post("/votes",  voteController.createVote);

//update a question

router.put("/votes/:id", verifyToken, voteController.updateVote);

//delete a question

router.delete("/votes/:id", verifyToken, voteController.deleteVote);

module.exports = router;
