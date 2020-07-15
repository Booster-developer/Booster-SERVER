const pool = require('../modules/pool');

exports.readMyProfile = async (req, data)=> {
    const query = `SELECT user_name, univ_idx, user_id, user_point FROM Booster.USER WHERE user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.passwordCheck = async (req, data)=> {
    const query = `SELECT * FROM Booster.USER WHERE user_idx = '${req.user_idx}'`;
    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.updateProfile = async (req, data)=> {
    const query = `UPDATE Booster.USER SET user_name = '${data.user_name}', univ_idx = ${data.user_university}, user_password = '${data.user_hashed}', user_salt = '${data.user_salt}' WHERE user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readEngineHistory = async (req)=> {
    const query = `SELECT user_point engine_point, engine.order_idx, engine_point engine_cost, engine_time, store_name engine_store_name FROM ((Booster.ENGINE engine JOIN Booster.USER user USING(user_idx)) LEFT JOIN Booster.ORDER orders ON engine.order_idx = orders.order_idx) LEFT JOIN Booster.STORE store ON store.store_idx = orders.store_idx WHERE engine.user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readNoticeHistory = async (req)=> {
    const query = `SELECT order_notice notice_confirm, order_idx notice_idx, order_complete_time notice_time, store_name FROM Booster.ORDER JOIN Booster.STORE USING(store_idx) WHERE order_state = 3 AND user_idx = ${req.user_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.updateNoticeConfirm = async (req)=> {
    const query = `UPDATE Booster.ORDER SET order_notice = 0 WHERE order_idx = ${req.params.order_idx}`;

    try {
        return await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};