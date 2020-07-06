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
    const query = `INSERT INTO Booster.FILE(order_idx, file_name, file_path) VALUES(${order_idx},"${req.file.originalname}","${req.file.location}");`;
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