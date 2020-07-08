const pool = require('../modules/pool');

exports.getSummaryInfo = async (req, res)=> {
    const query = `SELECT order_state, COUNT(*) count FROM Booster.ORDER WHERE user_idx = ${req.user_idx} GROUP BY order_state`;
    const result = [];

    try {
        const myOrderState = await pool.queryParam(query);

        //idx까지 가져와서 범위처리 해보자!
        myOrderState.forEach(function (order, index) {
            result[myOrderState[index].order_state] = myOrderState[index].count;
        });

        console.log(result.indexOf(null))

        return result;
    } catch (err) {
        console.log('ERROR : ', err);
        throw err;
    }
};