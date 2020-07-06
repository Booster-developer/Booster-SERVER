const pool = require('../modules/pool');

exports.readStoreList = async (req, res)=> {
    const query = `SELECT store_idx, store_name, store_image, store_location, price_color_double, price_color_single, price_gray_double, price_gray_single
                   FROM STORE INNER JOIN PRICE USING(price_idx) WHERE univ_idx = ${req.params.univ_idx};`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readUnivList = async (req, res) => {
    const query = `SELECT * FROM UNIVERSITY;`;
    try{
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

