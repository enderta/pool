const qservice = require('./questions.service');

const getQuestions = async (req, res) => {
    const data = await qservice.getQuestions();
    res.json(data);

}

const getQuestionById = async (req, res) => {
    const {id} = req.params;
    const data = await qservice.getQuestionById(id);
    res.json(data);
}


const createQuestion = async (req, res) => {
    const {user_id} = req.body;
    const {question} = req.body;
    if(user_id && question) {
        const data = await qservice.createQuestion(user_id, question);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error creating question"});
    }
}

const updateQuestion = async (req, res) => {
    const {id} = req.params;
    const {question} = req.body;
    const {user_id} = req.params;
    if(user_id) {
        const data = await qservice.updateQuestion(id, question);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error updating question"});
    }
}

const deleteQuestion = async (req, res) => {
    const {id} = req.params;
    const data = await qservice.deleteQuestion(id);
    res.json(data);
}

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};

