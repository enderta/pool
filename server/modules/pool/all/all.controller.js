const allServices = require('./all.service');

/*const pool = require("../../../db.config");

//pools=# select u.*,v.*,r.*,p.* from users u join polls p on u.id=p.user_id join responses r on p.id=r.poll_id join votes v on r.id=v.response_id where u.id=2;
const getAll= async (req,res)=>{
    try{
        const {id}=req.params;
        const response=await pool.query("select u.*,v.*,r.*,p.* from users u join polls p on u.id=p.user_id join responses r on p.id=r.poll_id join votes v on r.id=v.response_id where u.id=$1",[id]);
        res.json(response.rows);
    }catch(err){
        console.error(err.message);
    }
}

const getOne= async (req,res)=>{
    try{
        const {id}=req.params;
        const response=await pool.query("select u.*,v.*,r.*,p.* from users u join polls p on u.id=p.user_id join responses r on p.id=r.poll_id join votes v on r.id=v.response_id where u.id=$1",[id]);
        res.json(response.rows);
    }catch(err){
        console.error(err.message);
    }
}

const create= async (req,res)=>{
    try{
        const {id}=req.params;
        const {poll_id,response_id}=req.body;
        const response=await pool.query("insert into votes (poll_id,response_id) values ($1,$2) returning *",[poll_id,response_id]);
        res.json(response.rows);
    }catch(err){
        console.error(err.message);
    }
}

const update= async (req,res)=>{
    try{
        const {id}=req.params;
        const {poll_id,response_id}=req.body;
        const response=await pool.query("update votes set poll_id=$1,response_id=$2 where id=$3 returning *",[poll_id,response_id,id]);
        res.json(response.rows);
    }catch(err){
        console.error(err.message);
    }
}

const remove= async (req,res)=>{
    try{
        const {id}=req.params;
        const response=await pool.query("delete from votes where id=$1 returning *",[id]);
        res.json(response.rows);
    }catch(err){
        console.error(err.message);
    }
}

module.exports={
    getAll,
    getOne,
    create,
    update,
    remove
}
*/

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
