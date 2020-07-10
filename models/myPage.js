const pool = require('../modules/pool');

exports.updateProfile = async (req, data)=> {
    const query = `UPDATE Booster.USER SET user_name = '${data.user_name}', univ_idx = ${data.user_university}, user_password = '${data.user_hashed}', user_salt = '${data.user_salt}' WHERE user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};