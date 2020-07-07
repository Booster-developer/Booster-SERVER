const pool = require('../modules/pool');
const table = 'USER';

exports.signUp = async (data)=> {
    const fields = 'univ_idx, user_name, user_id, user_password, user_salt, user_point';
    const query = `INSERT INTO ${table}(${fields}) VALUES(${data.user_university}, '${data.user_name}', '${data.user_id}', '${data.user_hashed}', '${data.user_salt}', 0 )`;
    try {
        const result = await pool.queryParam(query);
        const insertId = result.insertId;
        return insertId;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.idCheck = async (req, res)=> {
    const query = `SELECT * FROM ${table} WHERE user_id = '${req.body.user_id}'`;
    try {
        const result = await pool.queryParam(query);
        return result.length !== 0;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.signIn = async (req, res)=> {
    const query = `SELECT * FROM ${table} WHERE user_id = '${req.body.user_id}'`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};