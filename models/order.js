const pool = require('../modules/pool');

exports.registerStore = async (req, res)=> {

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

exports.registerFile = async (req, res)=> {
    const query = `INSERT INTO Booster.FILE(order_idx, file_name, file_path) VALUES(${req.params.order_idx},"${req.file.originalname}","${req.file.location}");`;
    try {
        const result = await pool.queryParam(query);
        const file_idx = result.insertId;
        return file_idx;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.registerOptions = async (req, res)=> {
    const query = `UPDATE FILE SET file_copy_number = ${req.body.file_copy_number}, file_sided_type = "${req.body.file_sided_type}",
                file_direction= "${req.body.file_direction}", file_range_start=${req.body.file_range_start}, 
                file_range_end= ${req.body.file_range_end}, file_color= "${req.body.file_color}"
                WHERE file_idx = ${req.params.file_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.getTypePrice = async (req, res)=> {
    const query = `SELECT price_color_double, price_color_single, price_gray_double, price_gray_single
                FROM ((Booster.FILE JOIN Booster.ORDER USING(order_idx)) 
                JOIN Booster.STORE USING(store_idx)) 
                JOIN Booster.PRICE USING(price_idx) 
                WHERE file_idx = ${req.params.file_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.completePayment = async (req, res)=> {
    const query = `UPDATE Booster.ORDER SET order_comment="${req.body.order_comment}", order_state=1, order_pickup_time= "${req.body.order_pickup_time}"
                WHERE order_idx = ${req.params.order_idx}`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};


exports.readStoreInfo = async (req, res)=> {
    const query = `SELECT store_name, store_address FROM Booster.ORDER JOIN Booster.STORE USING(store_idx) 
                WHERE order_idx = ${req.params.order_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readFileInfo = async (req, res)=> {
    const query = `SELECT file_idx, file_name, file_path, file_price FROM Booster.FILE JOIN Booster.ORDER USING(order_idx) 
                WHERE order_idx = ${req.params.order_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

