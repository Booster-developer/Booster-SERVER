const pool = require('../modules/pool');

exports.readProgressList = async (req, res)=> {
    const query = `SELECT order_idx, store_name order_store_name, engine_time order_time, file_name order_title, order_state, COUNT(*) count FROM ((Booster.ORDER JOIN Booster.FILE USING(order_idx)) JOIN Booster.STORE USING(store_idx)) JOIN Booster.ENGINE USING(order_idx) WHERE user_idx = ${req.user_idx} GROUP BY order_idx`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};