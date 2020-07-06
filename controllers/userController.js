const user = require('../models/user');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const encrypt = require('../modules/crypto');
const crypto = require('crypto');

exports.signUp = async (req,res)=>{
    const {user_name, user_university, user_id, user_pw} = req.body;

    if (!user_name || !user_university || !user_id || !user_pw) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }

    //아이디 중복 확인 추가 해야 함


    const data = {user_name, user_university, user_id, user_pw};

    data.user_salt = crypto.randomBytes(32).toString("hex");
    data.user_hashed = crypto.pbkdf2Sync(
        user_pw,
        data.user_salt,
        1,
        32,
        "sha512").toString("hex");

    // const {user_salt,user_hashed} = await encrypt.encrypt(user_pw);
    // console.log(user_salt, user_hashed)
    //
    // const data = {user_name, user_university, user_id, user_pw,user_salt,user_hashed};

    try{
        const idx = await user.signUp(data);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, responseMessage.DB_ERROR));
        }

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.CREATED_USER));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.idCheck = async (req,res)=>{
    try{
        const result = await user.idCheck(req);

        if(result){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
        }

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.VALID_ID));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};