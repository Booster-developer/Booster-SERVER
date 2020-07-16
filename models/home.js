const pool = require('../modules/pool');

exports.readSummaryInfo = async (req, res)=> {
    const query = `SELECT order_state, user_name, COUNT(*) count FROM Booster.ORDER JOIN Booster.USER USING(user_idx) WHERE user_idx = ${req.user_idx} AND order_state BETWEEN 1 AND 3 GROUP BY order_state`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};