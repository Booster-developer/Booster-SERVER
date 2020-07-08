const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const home = require('../models/home');

exports.getSummaryInfo = async (req,res)=>{
    try{
        const result = await home.getSummaryInfo(req);

        for(let i=0; i<result.length; i++){
            if(result[i]==null) result[i] = 0;
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_SUMMARY_INFO_SUCCESS, {
            home_state: result[result.length -1],
            summary: result.slice(1,4)
        }));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};