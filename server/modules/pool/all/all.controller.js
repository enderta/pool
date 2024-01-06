const allServices = require('./all.service');

const getAll = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await allServices.getAll(id);
        res.json(response);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getAll
}
