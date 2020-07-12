const pool = require('../modules/pool');

exports.readProgressList = async (req, res)=> {
    const query = `SELECT orders.order_idx, store_name order_store_name, engine_time order_time, file_name order_title, order_state, COUNT(*) count FROM ((Booster.ORDER orders JOIN Booster.FILE USING(order_idx)) JOIN Booster.STORE USING(store_idx)) JOIN Booster.ENGINE engine ON engine.user_idx = orders.user_idx WHERE engine.user_idx = ${req.user_idx} GROUP BY order_idx`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readProgressDetailList = async (req, res)=> {
    const query = `SELECT order_idx, store_name order_store_name, order_state, engine_time order_time, order_comment, file_name, file_color, file_range_start, file_range_end, file_sided_type, file_direction, file_collect, file_copy_number FROM ((Booster.ORDER JOIN Booster.FILE USING(order_idx)) JOIN Booster.STORE USING(store_idx)) JOIN Booster.ENGINE engine USING(order_idx) WHERE engine.user_idx = ${req.user_idx} AND order_idx = ${req.params.order_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.registerPickUp = async (req, res)=> {
    const query = `UPDATE Booster.ORDER SET order_state = 4 WHERE user_idx = ${req.user_idx} AND order_idx = ${req.params.order_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.deleteOrder = async (req, res)=> {
    const query = `DELETE FROM Booster.ORDER WHERE order_idx = ${req.params.order_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};