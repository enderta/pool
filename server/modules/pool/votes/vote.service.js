
const pool = require("../../../db.config");

const createVote = async (response_id) => {
  try {
    const newVote = await pool.query(
        "INSERT INTO votes (response_id) VALUES ($1) RETURNING *",
        [response_id]
    );
    return newVote.rows[0];
  } catch (error) {
    throw new Error(`Error creating vote: ${error.message}`);
  }
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

const getVoteCount = async (response_id) => {
  try {
    const voteCount = await pool.query(
        "SELECT COUNT(*) FROM votes WHERE response_id = $1",
        [response_id]
    );
    return parseInt(voteCount.rows[0]["count"]); // Access the count property of the first row
  } catch (error) {
    throw new Error(`Error getting vote count: ${error.message}`);
  }
};

module.exports = {
  createVote,
  getVotes,
  getVote,
  updateVote,
  deleteVote,
  getVoteCount,
};