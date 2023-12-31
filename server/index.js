const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const userRoute = require("./modules/users/users.route");
const questionsRoute = require("./modules/pool/questions/questions.route");
const resRoute = require("./modules/pool/responses/res.route");
const voteRoute = require("./modules/pool/votes/vote.route");

app.use("/api", userRoute);

app.use("/api", questionsRoute);

app.use("/api", resRoute);

app.use('/api', voteRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

