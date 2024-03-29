const pool = require('../modules/pool');

exports.readStoreName = async (req, res)=> {
    const query = `SELECT store_name FROM Booster.STORE WHERE store_idx = ${req.params.store_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readAdminList = async (req, res)=> {
    const query = `SELECT order_idx, order_state, order_comment, user_name, engine_time, engine_point, file_name, file_extension, file_path, file_color, file_direction, file_sided_type, file_collect, file_range_start, file_range_end, file_copy_number 
                FROM (((Booster.STORE JOIN Booster.ORDER USING(store_idx)) 
                JOIN Booster.FILE USING(order_idx)) 
                JOIN Booster.USER USING(user_idx)) 
                JOIN Booster.ENGINE USING(order_idx) 
                WHERE store_idx = ${req.params.store_idx} ORDER BY order_idx DESC;`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};


exports.updateOrderState = async (req, completeTime, res)=> {
    const query = `UPDATE Booster.ORDER SET order_state = ${req.body.order_state}, order_complete_time = "${completeTime}" WHERE order_idx = ${req.body.order_idx};`;
    try {
        await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};