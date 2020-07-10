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