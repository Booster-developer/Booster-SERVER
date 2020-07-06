const pool = require('../modules/pool');

exports.readStoreList = async (req, res)=>{
    const query = `SELECT store_idx, store_name, store_image, store_location, price_color_true, price_color_false, price_sided_double, price_sided_single 
                   FROM STORE INNER JOIN PRICE USING(price_idx) WHERE univer_idx = 1;`;
    try {
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};

exports.readUnivList = async (req, res) => {
    const query = `SELECT univ_name, univ_address, univ_line FROM UNIVERSITY;`;
    try{
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

