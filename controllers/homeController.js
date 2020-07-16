const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const home = require('../models/home');

exports.readSummaryInfo = async (req,res)=>{
    const result = [];

    try{
        const myOrderState = await home.readSummaryInfo(req);
        // 주문 내역 없는 경우
        if(myOrderState.length === 0){
            return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ORDER));
        }

        myOrderState.forEach(function (order, index) {
            result[myOrderState[index].order_state] = myOrderState[index].count;
        });

        for(let i=0; i<result.length; i++){
            if(result[i]==null) result[i] = 0;
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_SUMMARY_INFO_SUCCESS, {
            home_state: result.slice(1,4).length,
            //summary: result.slice(1,4),
            user_name: myOrderState[0].user_name
        }));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};