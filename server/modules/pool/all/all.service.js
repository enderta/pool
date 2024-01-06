const pool = require("../../../db.config");

const getAll = async (id) => {
    try {
        const response = await pool.query(
            `select u.*,v.*,r.*,p.* from users u join polls p on u.id=p.user_id join responses r on p.id=r.poll_id join votes v on r.id=v.response_id where u.id=$1;`,
            [id]
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }
};


module.exports={
    getAll

}
