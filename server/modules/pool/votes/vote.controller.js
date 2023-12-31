const voteservice = require('./vote.service');

const getVotes = async (req, res) => {
    try {
        const votes = await voteservice.getVotes();
        if (votes.length === 0) {
            res.status(404).json({ error: 'No votes found' });
        } else {
            res.status(200).json(votes);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getVote = async (req, res) => {
    try {
        const vote = await voteservice.getVote(req.params.id);
        res.status(200).json(vote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
const createRes = async (req, res) => {
    const {poll_id} = req.body; // Corrected from poo_id to poll_id
    const {option} = req.body;
    if(poll_id && option) {
        const data = await resService.createResponse(poll_id, option);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error creating response"});
    }
}
* */

const createVote = async (req, res) => {
    const { response_id } = req.body;

    if (response_id) {
        try {
            const data = await voteservice.createVote(Number(response_id));  // Parse response_id as a number
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing response_id in the request body" });
    }
};

const updateVote = async (req, res) => {
    try {
        const { id } = req.params;
        const [vote] = await voteservice.updateVote(id, req.body);
        if (vote) {
            res.status(200).json({ message: `Vote ${id} updated` });
        } else {
            res.status(404).json({ message: `Vote ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVote = async (req, res) => {
    try {
        const { id } = req.params;
        const vote = await voteservice.deleteVote(id);
        if (vote) {
            res.status(200).json({ message: `Vote ${id} deleted` });
        } else {
            res.status(404).json({ message: `Vote ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVoteCount = async (req, res) => {
    try {
        const { id } = req.params;
        const voteCount = await voteservice.getVoteCount(id);
        if (voteCount) {
            res.status(200).json(voteCount);
        } else {
            res.status(404).json({ message: `Vote count for response ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getVotes,
    getVote,
    createVote,
    updateVote,
    deleteVote,
    getVoteCount
};