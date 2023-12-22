const resService = require('./res.service');

//module.exports = {
//     createResponse,
//     getResponses,
//     getResponseById,
//     updateResponse,
//     deleteResponse
// };

const getRes = async (req, res) => {
    const data = await resService.getResponses();
    res.json(data);
}

const getResById = async (req, res) => {
    const {id} = req.params;
    const data = await resService.getResponseById(id);
    res.json(data);

}

const createRes = async (req, res) => {

    const {user_id} = req.params;
    const {option} = req.body;
    if(user_id && option) {
        const data = await resService.createResponse(user_id, option);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error creating response"});
    }
}

const updateRes = async (req, res) => {
    const {id} = req.params;
    const {option} = req.body;
    const {user_id} = req.params;
    if(user_id) {
        const data = await resService.updateResponse(id, option);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error updating response"});
    }
}

const deleteRes = async (req, res) => {
    const {id} = req.params;
    const data = await resService.deleteResponse(id);
    res.json(data);
}

module.exports = {
    getRes,
    getResById,
    createRes,
    updateRes,
    deleteRes
};


