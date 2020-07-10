const user = require('../models/user');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const encrypt = require('../modules/crypto');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

exports.signUp = async (req,res)=>{
    const {user_name, user_university, user_id, user_pw} = req.body;

    if (!user_name || !user_university || !user_id || !user_pw) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }

    //아이디 중복 확인
    if (await user.idCheck(req)) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
        return;
    }

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

exports.signIn = async (req,res)=>{
    const { user_id, user_pw } = req.body;

    if (!user_id || !user_pw) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }

    try{
        const userResult = await user.signIn(req);
        if (userResult[0] === undefined) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }

        const hashed = crypto.pbkdf2Sync(
            user_pw,
            userResult[0].user_salt,
            1,
            32,
            "sha512").toString("hex");

        if (hashed !== userResult[0].user_password) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
        }

        const {token,_} = await jwt.sign(userResult[0]);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.LOGIN_SUCCESS, {
            university_idx: userResult[0].univ_idx,
            accessToken: token
        }));

    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};