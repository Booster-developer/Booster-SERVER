const pool = require('../modules/pool');

exports.readUserName = async (req, res)=> {
    const query = `SELECT user_name FROM Booster.USER WHERE user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readProgressList = async (req, res)=> {
    const query = `SELECT orders.order_idx, store_name order_store_name, engine_time order_time, file_name order_title, file_extension order_extension, order_state, COUNT(*) count, user_name FROM (((Booster.ORDER orders JOIN Booster.FILE files USING(order_idx)) JOIN Booster.STORE USING(store_idx)) JOIN Booster.USER users USING(user_idx)) JOIN Booster.ENGINE USING(order_idx) WHERE users.user_idx = ${req.user_idx} AND orders.order_state BETWEEN 1 AND 3 GROUP BY order_idx ORDER BY order_idx desc`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readProgressDetailList = async (req, res)=> {
    const query = `SELECT orders.order_idx, store_name order_store_name, order_state, engine_time order_time, order_comment, file_thumbnail_path, file_name, file_extension, file_price, file_color, file_range_start, file_range_end, file_sided_type, file_direction, file_collect, file_copy_number FROM ((Booster.ORDER orders JOIN Booster.FILE USING(order_idx)) JOIN Booster.STORE USING(store_idx)) JOIN Booster.ENGINE engine USING(order_idx) WHERE engine.user_idx = ${req.user_idx} AND orders.order_idx = ${req.params.order_idx}`;

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