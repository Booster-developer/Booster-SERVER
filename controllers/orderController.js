const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const order = require('../models/order');

exports.registerFile = async (req,res)=>{
    try{
        const order_idx = await order.registerOrder(req);
        const file_idx = await order.registerFile(req, order_idx);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_FILE_ORDER_SUCCESS, {file_idx: file_idx}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};


exports.registerOptions = async (req,res)=>{
    try{
        await order.registerOptions(req);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.REGISTER_OPTIONS_ORDER_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.completePayment = async (req,res)=>{
    try{
        await order.completePayment(req);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.REGISTER_OPTIONS_ORDER_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};