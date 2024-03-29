const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const admin = require('../models/admin');
const moment = require('moment');

exports.readAdminList = async (req,res)=>{
    try{
        const result1 = await admin.readStoreName(req);
        const result2 = await admin.readAdminList(req);

        // 성공
        return res.status(statusCode.OK).send(res.render("admin",{store_name: result1.store_name , data: result2}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};


exports.updateOrderState = async (req,res)=>{
    try{
        const completeTime = moment().format('YYYY.MM.DD HH:mm');
        // state update
        await admin.updateOrderState(req, completeTime);

        const result1 = await admin.readStoreName(req);
        const result2 = await admin.readAdminList(req);

        // 성공
        return res.status(statusCode.OK).send(res.render("admin",{store_name: result1.store_name , data: result2}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};