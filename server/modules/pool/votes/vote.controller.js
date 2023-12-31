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

const createVote = async (req, res) => {
    try {
        const vote = await voteservice.createVote(req.body);
        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

module.exports = {
    getVotes,
    getVote,
    createVote,
    updateVote,
    deleteVote
};