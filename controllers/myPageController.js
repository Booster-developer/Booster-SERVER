const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const myPage = require('../models/myPage');
const crypto = require('crypto');

exports.updateProfile = async (req,res)=>{
    const {user_name, user_university, user_pw} = req.body;

    const data = {user_name, user_university, user_pw};
    console.log(req.user_pw)

    data.user_salt = crypto.randomBytes(32).toString("hex");
    data.user_hashed = crypto.pbkdf2Sync(
        data.user_pw,
        data.user_salt,
        1,
        32,
        "sha512").toString("hex");

    try{
        const result = await myPage.updateProfile(req,data);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.UPDATE_PROFILE_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readEngineHistory = async (req,res)=>{
    const result = [];

    try{
        const myEngineHistory = await myPage.readEngineHistory(req);

        myEngineHistory.forEach(function (engine, index) {
            let costSign = 0;
            if(!myEngineHistory[index].order_idx){
                costSign = 1;
                myEngineHistory[index].engine_store_name = '엔진 충전'
            }

            result[index] = {
                engine_sign: costSign,
                engine_cost: myEngineHistory[index].engine_cost,
                engine_time: myEngineHistory[index].engine_time,
                engine_store_name: myEngineHistory[index].engine_store_name
            };
        });

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_ENGINE_HISTORY_SUCCESS,{
            engine_point: myEngineHistory[0].engine_point,
            engine_list: result
        }));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readNoticeHistory = async (req,res)=>{
    try{
        const result = await myPage.readNoticeHistory(req);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.UPDATE_PROFILE_SUCCESS,result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};