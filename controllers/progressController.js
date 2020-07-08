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

exports.readProgressDetailList = async (req,res)=>{
    const result = [];
    let price = 0;

    try{
        const myProgressDetailList = await progress.readProgressDetailList(req);

        myProgressDetailList.forEach(function (order, index) {
            result[index] = {
                file_name: myProgressDetailList[index].file_name,
                file_color: myProgressDetailList[index].file_color,
                file_range_start: myProgressDetailList[index].file_range_start,
                file_range_end: myProgressDetailList[index].file_range_end,
                file_sided_type: myProgressDetailList[index].file_sided_type,
                file_direction: myProgressDetailList[index].file_direction,
                file_collect: myProgressDetailList[index].file_collect,
                file_copy_number: myProgressDetailList[index].file_copy_number
            };
        });

        for(let i =0; i<myProgressDetailList.length; i++){
            price += myProgressDetailList[i].file_price;
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROGRESS_DETAIL_LIST_SUCCESS, {
            order_idx: myProgressDetailList[0].order_idx,
            order_store_name:myProgressDetailList[0].order_store_name,
            order_state:myProgressDetailList[0].order_state,
            order_time:myProgressDetailList[0].order_time,
            order_price:price,
            order_comment:myProgressDetailList[0].order_comment,
            order_file_list: result
        }));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};