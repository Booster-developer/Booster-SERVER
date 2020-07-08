const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const progress = require('../models/progress');

exports.readProgressList = async (req,res)=>{
    const result = [];

    try{
        const myProgressList = await progress.readProgressList(req);

        myProgressList.forEach(function (order, index) {
            result[index] = {
                order_idx: myProgressList[index].order_idx,
                order_store_name: myProgressList[index].order_store_name,
                order_time: myProgressList[index].order_time,
                order_title: myProgressList[index].order_title+" 외 "+myProgressList[index].count+"건",
                order_state: myProgressList[index].order_state
            };
        });

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROGRESS_LIST_SUCCESS, {
            booster_count: result.length,
            order_list: result
        }));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};