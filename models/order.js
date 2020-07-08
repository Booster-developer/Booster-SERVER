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

exports.registerFile = async (req, file_name, type, res)=> {
    const query = `INSERT INTO Booster.FILE(order_idx, file_name, file_path, file_extention) VALUES(${req.params.order_idx},"${file_name}","${req.file.location}", "${type}");`;
    try {
        const result = await pool.queryParam(query);
        const file_idx = result.insertId;
        return file_idx;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.registerOptions = async (req, file_range_start, res)=> {
    const query = `UPDATE FILE SET file_copy_number = ${req.body.file_copy_number}, file_sided_type = "${req.body.file_sided_type}",
                file_direction= "${req.body.file_direction}", file_range_start=${file_range_start}, 
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

exports.saveFilePrice = async (req, file_price, res)=> {
    const query = `UPDATE Booster.FILE SET file_price= ${file_price}
                WHERE file_idx = ${req.params.file_idx}`;
    try {
        await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.registerOrderRequest = async (req, res)=> {
    const query = `UPDATE Booster.ORDER SET order_comment="${req.body.order_comment}", order_state=1
                WHERE order_idx = ${req.params.order_idx}`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.updateEngineInfo = async (req, order_price, order_time, res)=> {
    const query = `INSERT INTO Booster.ENGINE(order_idx, engine_point, engine_time) VALUES(${req.params.order_idx}, ${order_price}, "${order_time}")`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.updateMyEngine = async (req, order_price, res)=> {
    const query = `UPDATE Booster.USER SET user_point = user_point - ${order_price}
                WHERE user_idx = ${req.user_idx}`;
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

exports.readPaymentInfo = async (req, res)=> {
    const query = `SELECT store_name, store_idx, user_point 
                FROM (Booster.ORDER JOIN Booster.STORE USING(store_idx) 
                JOIN Booster.USER USING(user_idx)) 
                WHERE order_idx = ${req.params.order_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readFileOption = async (req, res)=> {
    const query = `SELECT file_name, file_color, file_direction, file_sided_type, file_collect, file_range_start, file_range_end, file_copy_number, file_price 
                FROM Booster.FILE JOIN Booster.ORDER USING(order_idx) 
                WHERE order_idx = ${req.params.order_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readFileOption2 = async (req, res)=> {
    const query = `SELECT file_color, file_direction, file_sided_type, file_collect, file_range_start, file_range_end, file_copy_number 
                FROM Booster.FILE WHERE file_idx = ${req.params.file_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.deleteFile = async (req, res) => {
    const query = `DELETE FROM Booster.FILE WHERE file_idx= ${req.params.file_idx};`;
    try{
        await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}