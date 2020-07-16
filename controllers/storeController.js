const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const store = require('../models/store');
const moment = require('moment');

exports.readStoreList = async (req,res)=>{
    try{
        // 정렬(운영 중 즐겨찾기 매장 - 운영 중 일반 매장 - 미운영 중 즐겨찾기 매장 - 미운영 중 일반 매장)
        // 즐겨찾는 매장 store_favorite =1
        const result1 = await store.readFavoriteStoreList(req);
        // 일반 매장 store_favorite = 0
        const result2 = await store.readStoreList(req);

        // store_open
        // 요일 반환 - 0: 일, 1: 월, 2: 화. 3: 수, 4: 목, 5: 금, 6: 토
        const nowDay = moment().day();
        const nowTime = moment().format('HH:mm');
        const nowMinute = nowTime.split(':')[0] * 60 + nowTime.split(':')[1];

        // 즐겨찾는 매장 - 운영, 미운영
        let openFavoriteStore= [];
        let closeFavoriteStore= [];
        result1.forEach(function (element) {
            element.store_favorite = 1;
            let startTime, endTime, startTimeMinute= 0, endTimeMinute= 0;
            if(nowDay === 0) { // 일요일
                if(element.store_time_sunday !== '휴무') {
                    startTime = element.store_time_sunday.split('~')[0];
                    endTime = element.store_time_sunday.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }
            else if(nowDay === 6) { // 토요일
                if(element.store_time_saturday !== '휴무') {
                    startTime = element.store_time_saturday.split('~')[0];
                    endTime = element.store_time_saturday.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }
            else{ // 평일
                if(element.store_time_weekdays !== '휴무') {
                    startTime = element.store_time_weekdays.split('~')[0];
                    endTime = element.store_time_weekdays.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }

            delete element.store_time_weekdays;
            delete element.store_time_saturday;
            delete element.store_time_sunday;

            if((nowMinute- startTimeMinute >= 0) && (nowMinute - endTimeMinute <= 0)) {
                element.store_open = 1;
                openFavoriteStore.push(element);
            }
            else {
                element.store_open = 0;
                closeFavoriteStore.push(element);
            }
        })

        // 일반 매장 - 운영, 미운영
        let openStore= [];
        let closeStore= [];
        result2.forEach(function (element) {
            element.store_favorite = 0;
            let startTime, endTime, startTimeMinute= 0, endTimeMinute= 0;
            if(nowDay === 0) { // 일요일
                if(element.store_time_sunday !== '휴무') {
                    startTime = element.store_time_sunday.split('~')[0];
                    endTime = element.store_time_sunday.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }
            else if(nowDay === 6) { // 토요일
                if(element.store_time_saturday !== '휴무') {
                    startTime = element.store_time_saturday.split('~')[0];
                    endTime = element.store_time_saturday.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }
            else{ // 평일
                if(element.store_time_weekdays !== '휴무') {
                    startTime = element.store_time_weekdays.split('~')[0];
                    endTime = element.store_time_weekdays.split('~')[1];
                    startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                    endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
                }
            }

            delete element.store_time_weekdays;
            delete element.store_time_saturday;
            delete element.store_time_sunday;

            if(nowMinute >= startTimeMinute && (nowMinute - endTimeMinute <= 0)) {
                element.store_open = 1;
                openStore.push(element);
            }
            else {
                element.store_open = 0;
                closeStore.push(element);
            }
        })

        //  합치기
        const result= openFavoriteStore.concat(openStore.concat(closeFavoriteStore).concat(closeStore));

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

        const nowDay = moment().day();
        const nowTime = moment().format('HH:mm');
        const nowMinute = nowTime.split(':')[0] * 60 + nowTime.split(':')[1];

        let startTime, endTime, startTimeMinute= 0, endTimeMinute= 0;
        if(nowDay === 0) { // 일요일
            if(result.store_time_sunday !== '휴무') {
                startTime = result.store_time_sunday.split('~')[0];
                endTime = result.store_time_sunday.split('~')[1];
                startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
            }
        }
        else if(nowDay === 6) { // 토요일
            if(result.store_time_saturday !== '휴무') {
                startTime = result.store_time_saturday.split('~')[0];
                endTime = result.store_time_saturday.split('~')[1];
                startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
            }
        }
        else{ // 평일
            if(result.store_time_weekdays !== '휴무') {
                startTime = result.store_time_weekdays.split('~')[0];
                endTime = result.store_time_weekdays.split('~')[1];
                startTimeMinute = startTime.split(':')[0] * 60 + startTime.split(':')[1];
                endTimeMinute = endTime.split(':')[0] * 60 + endTime.split(':')[1];
            }
        }

        if((nowMinute- startTimeMinute >= 0) && (nowMinute - endTimeMinute <= 0)) {
            result.store_open = 1;
        }
        else {
            result.store_open = 0;
        }

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

        let result = [];
        if(favorite_store[0] === undefined) result = {recent_order_store, store_all};
        else result = {recent_order_store, favorite_store, store_all};

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_ORDER_TAB_STORE_LIST_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
}