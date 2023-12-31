const pool = require("../../../db.config");

/*
* CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  response_id INT REFERENCES responses(id) ON DELETE CASCADE
);
* */

const createVote = async (req, res) => {
  const { response_id } = req.body;
  try {
    const newVote = await pool.query(
      "INSERT INTO votes (response_id) VALUES($1) RETURNING *",
      [response_id]
    );
    res.json(newVote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const getVotes = async (req, res) => {
  try {
    const allVotes = await pool.query("SELECT * FROM votes");
    res.json(allVotes.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getVote = async (req, res) => {
  const { id } = req.params;
  try {
    const vote = await pool.query("SELECT * FROM votes WHERE id = $1", [id]);
    res.json(vote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateVote = async (req, res) => {
  const { id } = req.params;
  const { response_id } = req.body;
  try {
    const updateVote = await pool.query(
      "UPDATE votes SET response_id = $1 WHERE id = $2",
      [response_id, id]
    );
    res.json("Vote was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

const deleteVote = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteVote = await pool.query("DELETE FROM votes WHERE id = $1", [
      id,
    ]);
    res.json("Vote was deleted!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createVote,
  getVotes,
  getVote,
  updateVote,
  deleteVote,
};