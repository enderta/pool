const bcrypt = require("bcrypt");
const pool = require("../../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";


const createQuestion = async (user_id,question) => {
    if(!user_id || !question) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("INSERT INTO polls (user_id,question) VALUES ($1,$2) RETURNING *",
            [user_id,question]);
        return {
            status: 'success',
            message: `Question created successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while creating question");
    }

}

const getQuestions = async () => {
    try {
        const result = await pool.query("SELECT * FROM polls");
        return {
            status: 'success',
            message: `Retrieved ${result.rows.length} questions`,
            data: result.rows
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while getting questions from the database");
    }
};

const getQuestionById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM polls WHERE id = $1", [id]);
        return {
            status: 'success',
            message: `Retrieved question with id ${id}`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while getting question from the database");
    }
}

const updateQuestion = async (id,question) => {
    if(!id || !question) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("UPDATE polls SET question = $1 WHERE id = $2 RETURNING *",
            [question,id]);
        return {
            status: 'success',
            message: `Question updated successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while updating question");
    }
}

const deleteQuestion = async (id) => {
    if(!id) {
        throw new Error("Missing required fields");
    }
    try {
        const result = await pool.query("DELETE FROM polls WHERE id = $1 RETURNING *",
            [id]);
        return {
            status: 'success',
            message: `Question deleted successfully`,
            data: result.rows[0]
        };
    } catch(err) {
        console.error(err);
        throw new Error("Error while deleting question");
    }
}

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};