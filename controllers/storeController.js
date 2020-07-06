const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const store = require('../models/store');

exports.readStoreList = async (req,res)=>{
    try{
        // 정렬(운영 중 즐겨찾기 매장 - 운영 중 일반 매장 - 미운영 중 즐겨찾기 매장 - 미운영 중 일반 매)
        // 즐겨찾기, 운영  컬럼 넣
        const result = await store.readStoreList(req);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_STORE_LIST_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readUnivList = async (req, res) => {
    try{
        const result = await store.readUnivList(req);
        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_UNIV_LIST_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
}

exports.readStoreDetail = async (req, res) => {
    try{
        const result = await store.readStoreDetail(req);

        // 매장 즐겨찾기 유무
        if(await store.isFavorite(req) === undefined) result.store_favorite = 0;
        else result.store_favorite = 1;
        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_STORE_DETAIL_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
}