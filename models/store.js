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

exports.readStoreDetail = async (req, res) => {
    const query = `SELECT store_image, store_name, store_address, store_location, store_time_weekdays, store_time_saturday, store_time_sunday, store_phone_number, price_color_double, price_color_single, price_gray_double, price_gray_single, univ_line 
                FROM (Booster.STORE JOIN Booster.PRICE USING(price_idx)) JOIN Booster.UNIVERSITY USING(univ_idx) 
                WHERE store_idx = ${req.params.store_idx};`;
    try{
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

exports.isFavorite = async (req, res) => {
    const query = `SELECT * FROM Booster.FAVORITE WHERE user_idx=${req.user_idx} AND store_idx=${req.params.store_idx};`;
    try{
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}


exports.registerFavorite = async (req, res) => {
    const query = `INSERT INTO Booster.FAVORITE(user_idx, store_idx) VALUES(${req.user_idx},${req.params.store_idx});`;
    try{
        await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

exports.cancleFavorite = async (req, res) => {
    const query = `DELETE FROM Booster.FAVORITE WHERE user_idx= ${req.user_idx} AND store_idx=${req.params.store_idx};`;
    try{
        await pool.queryParam(query);
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}


exports.readOrderRecentStore = async (req, res) => {
    const query = `SELECT store_idx, store_name, store_image, store_address 
                FROM Booster.ORDER JOIN Booster.STORE USING(store_idx) 
                WHERE user_idx = ${req.user_idx} ORDER BY order_idx DESC;`;
    try{
        const result = await pool.queryParam(query);
        return result[0];
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

exports.readOrderFavoriteStore = async (req, res) => {
    const query = `SELECT Booster.STORE.store_idx, store_name, store_image, store_address 
                FROM (Booster.USER JOIN Booster.STORE USING(univ_idx)) 
                JOIN Booster.FAVORITE USING(user_idx) 
                WHERE user_idx = ${req.user_idx} AND Booster.STORE.store_idx = Booster.FAVORITE.store_idx;`;
    try{
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

exports.readOrderAllStore = async (req, res) => {
    const query = `SELECT store_idx, store_name, store_image, store_address 
                FROM Booster.USER JOIN Booster.STORE USING(univ_idx) 
                WHERE user_idx = ${req.user_idx};`;
    try{
        const result = await pool.queryParam(query);
        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
}