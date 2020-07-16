const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const progress = require('../models/progress');

exports.readProgressList = async (req,res)=>{
    const result = [];

    try{
        const myProgressList = await progress.readProgressList(req);
        // 주문 내역 없는 경우
        if(myProgressList.length === 0){
            return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ORDER));
        }

        myProgressList.forEach(function (order, index) {
            if(myProgressList[index].count-1 !== 0){
                result[index] = {
                    order_idx: myProgressList[index].order_idx,
                    order_store_name: myProgressList[index].order_store_name,
                    order_time: myProgressList[index].order_time,
                    order_title: myProgressList[index].order_title+'.'+ myProgressList[index].order_extension+' 외 '+(myProgressList[index].count-1)+'건',
                    order_state: myProgressList[index].order_state
                };
            }
            else {
                result[index] = {
                    order_idx: myProgressList[index].order_idx,
                    order_store_name: myProgressList[index].order_store_name,
                    order_time: myProgressList[index].order_time,
                    order_title: myProgressList[index].order_title+'.'+ myProgressList[index].order_extension,
                    order_state: myProgressList[index].order_state
                };
            }
        });

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROGRESS_LIST_SUCCESS, {
            user_name: myProgressList[0].user_name,
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

        // 주문 내역 없는 경우
        if(myProgressDetailList.length === 0){
            return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ORDER));
        }

        myProgressDetailList.forEach(function (order, index) {
            result[index] = {
                file_thumbnail_path: myProgressDetailList[index].file_thumbnail_path,
                file_name: myProgressDetailList[index].file_name,
                file_extension: myProgressDetailList[index].file_extension,
                file_price: myProgressDetailList[index].file_price,
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

exports.registerPickUp = async (req,res)=>{

    try{
        await progress.registerPickUp(req);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.REGISTER_PICKUP_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.deleteOrder = async (req,res)=>{

    try{
        await progress.deleteOrder(req);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.DELETE_ORDER_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};