
const pool = require("../../../db.config");

const createVote = async (response_id) => {
  const newVote = await pool.query(
      "INSERT INTO votes (response_id) VALUES($1) RETURNING *",
      [response_id]
  );
  return newVote.rows[0];
};

const getVotes = async () => {
  const allVotes = await pool.query("SELECT * FROM votes");
  return allVotes.rows;
};

const getVote = async (id) => {
  const vote = await pool.query("SELECT * FROM votes WHERE id = $1", [id]);
  return vote.rows[0];
};

const updateVote = async (id, response_id) => {
  const updateVote = await pool.query(
      "UPDATE votes SET response_id = $1 WHERE id = $2",
      [response_id, id]
  );
  return updateVote.rowCount > 0;
};

const deleteVote = async (id) => {
  const deleteVote = await pool.query("DELETE FROM votes WHERE id = $1", [id]);
  return deleteVote.rowCount > 0;
};

module.exports = {
  createVote,
  getVotes,
  getVote,
  updateVote,
  deleteVote,
};