const bcrypt = require("bcrypt");
const pool = require("../../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";

/*
CREATE TABLE responses (
   id SERIAL PRIMARY KEY,
   option VARCHAR(255) NOT NULL,
   poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE
 );
*/

const createResponse = async (poll_id,option) => {
    if(!poll_id || !option) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("INSERT INTO responses (poll_id,option) VALUES ($1,$2) RETURNING *",
            [poll_id,option]);
        return {
            status: 'success',
            message: `Response created successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while creating response");
    }

}

const getResponses = async () => {
    try {
        const result = await pool.query("SELECT * FROM responses");
        return {
            status: 'success',
            message: `Retrieved ${result.rows.length} responses`,
            data: result.rows
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while getting responses from the database");
    }
};

const getResponseById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM responses WHERE id = $1", [id]);
        return {
            status: 'success',
            message: `Retrieved response with id ${id}`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while getting response from the database");
    }
}

const updateResponse = async (id,option) => {
    if(!id || !option) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("UPDATE responses SET option = $1 WHERE id = $2 RETURNING *",
            [option,id]);
        return {
            status: 'success',
            message: `Response updated successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while updating response");
    }
}

const deleteResponse = async (id) => {
    if(!id) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("DELETE FROM responses WHERE id = $1 RETURNING *",
            [id]);
        return {
            status: 'success',
            message: `Response deleted successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while deleting response");
    }
}

module.exports = {
    createResponse,
    getResponses,
    getResponseById,
    updateResponse,
    deleteResponse
};