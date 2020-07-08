const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const store = require('../models/store');

exports.readStoreList = async (req,res)=>{
    try{
        // 정렬(운영 중 즐겨찾기 매장 - 운영 중 일반 매장 - 미운영 중 즐겨찾기 매장 - 미운영 중 일반 매장)
        // 즐겨찾기, 운영 컬럼 넣기
        const result = await store.readStoreList(req);
        //store_favorite, store_open

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

exports.registerFavorite = async (req, res) => {
    try{
        // 이미 즐겨찾는 매장인지 확인 -> 해지의 경
        if(await store.isFavorite(req) !== undefined) {
            await store.cancleFavorite(req);
            return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.CANCLE_STORE_FAVORITE_SUCCESS));
        }

        // 즐겨찾기 등록
        else {
            await store.registerFavorite(req);
            return res.status(statusCode.OK).send(util.successWithoutData(statusCode.CREATED,responseMessage.REGISTER_STORE_FAVORITE_SUCCESS));
        }

    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
}


exports.readOrderStoreList = async (req, res) => {
    try{
        // 최근 주문 매장
        const recent_order_store = await store.readOrderRecentStore(req);
        // 즐겨찾는 매장
        const favorite_store = await store.readOrderFavoriteStore(req);
        // 매장 모두 보기
        const store_all = await store.readOrderAllStore(req);

        const result = {recent_order_store, favorite_store, store_all};

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_ORDER_TAB_STORE_LIST_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
}