const pool = require('../modules/pool');

exports.getSummaryInfo = async (req, res)=> {
    const query = `SELECT order_state, COUNT(*) count FROM Booster.ORDER WHERE user_idx = ${req.user_idx} GROUP BY order_state`;

    try {
        const result = await pool.queryParam(query);

        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};