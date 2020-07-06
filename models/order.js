const pool = require('../modules/pool');

exports.registerOrder = async (req, res)=> {
    const query = `INSERT INTO Booster.ORDER(user_idx, store_idx, order_state) 
                    VALUES(${req.user_idx}, ${req.params.store_idx}, 0);`;
    try {
        const result = await pool.queryParam(query);
        const order_idx = result.insertId;
        return order_idx;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.registerFile = async (req, order_idx, res)=> {
    const query = `INSERT INTO Booster.FILE(order_idx, file_name, file_path) VALUES(${order_idx},"test","test");`;
    try {
        const result = await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};