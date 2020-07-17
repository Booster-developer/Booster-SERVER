const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const myPage = require('../models/myPage');
const crypto = require('crypto');

exports.readMyProfile = async (req,res)=>{
    try{
        const result = await myPage.readMyProfile(req);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS, result[0]));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.passwordCheck = async (req,res)=>{
    if (!req.body.user_pw) {
        res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }

    try{
        const userResult = await myPage.passwordCheck(req);
        if (userResult[0] === undefined) {
            return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }

        const hashed = crypto.pbkdf2Sync(
            req.body.user_pw,
            userResult[0].user_salt,
            1,
            32,
            "sha512").toString("hex");

        if (hashed !== userResult[0].user_password) {
            return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
        }

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.MATCH_PW));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.updateProfile = async (req,res)=>{
    const {user_name, user_university, user_pw} = req.body;

    const data = {user_name, user_university, user_pw};

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

        // 엔진 내역 없는 경우
        if(myEngineHistory.length === 0){
            const user = await myPage.readUserEngine(req);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_ENGINE,{
                user_point: user[0].user_point
            }));
        }

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

        console.log(result)

        // 알림 내역 없는 경우
        if(result.length === 0){
            return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK, responseMessage.NO_NOTICE,));
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_NOTICE_HISTORY_SUCCESS,result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.updateNoticeConfirm = async (req,res)=>{
    try{
        await myPage.updateNoticeConfirm(req);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.UPDATE_NOTICE_CONFIRM_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};