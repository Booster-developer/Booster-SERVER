const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const order = require('../models/order');
const moment = require('moment');
const getPage = require('../modules/getPage');

exports.registerStore = async (req,res)=>{
    try{
        const order_idx = await order.registerStore(req);
        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_STORE_ORDER_SUCCESS, {order_idx: order_idx}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.registerFile = async (req,res)=>{
    try{
        const file_idx = await order.registerFile(req);

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_FILE_ORDER_SUCCESS, {file_idx: file_idx}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};


exports.registerOptions = async (req,res)=>{
    const {file_color, file_direction, file_sided_type, file_collect, file_range_start, file_range_end, file_copy_number} = req.body;
    try{
        // 옵션 선택 정보 저장
        await order.registerOptions(req);

        // 페이지 수 계산
        let page = Math.ceil((file_range_end - file_range_start + 1)/file_collect);
        if(file_sided_type !== "단면")
            page = Math.ceil(page/2);
        page = page * file_copy_number;

        // 타입별 가격 가져오기
        const price_type = await order.getTypePrice(req);

        // 컬러 흑백 단면 양면별로 가격 계산
        let PRICE;
        if(file_color === "컬러"){
            if(file_sided_type ==="단면") PRICE = page * price_type.price_color_single;
            else PRICE = page * price_type.price_color_double;
        }
        else{
            if(file_sided_type ==="단면") PRICE = page * price_type.price_gray_single;
            else PRICE = page * price_type.price_gray_double;
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_OPTIONS_ORDER_SUCCESS, {file_price: PRICE}));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.registerOrderRequest = async (req,res)=>{
    try{
        // 주문 시간, 주문 총 금액(engine)
        const orderTime = moment().format('YYYY.MM.DD HH:mm');
        const file_info = await order.readFileInfo(req);
        let order_price= 0;
        file_info.forEach(function (element) {
            order_price += element.file_price;
        })
        await order.updateEngineInfo(req, order_price, orderTime);

        // 주문 요청 사항 저장, 주문 상태 수
        await order.registerOrderRequest(req);

        // 내 엔진 업데이트 user
        await order.updateMyEngine(req, order_price);

        // 성공
        return res.status(statusCode.OK).send(util.successWithoutData(statusCode.OK,responseMessage.REGISTER_ORDER_REQUEST_SUCCESS));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readWaitingList = async (req,res)=>{
    try{
        const store_info = await order.readStoreInfo(req);
        const file_info = await order.readFileInfo(req);
        let order_price= 0;
        file_info.forEach(function (element) {
            order_price += element.file_price;
            delete element.file_price;
        })
        const result = {
            store_name: store_info.store_name,
            store_address: store_info.store_address,
            file_info,
            order_price: order_price
        }
        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_WAITING_LIST_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readPaymentInfo = async (req,res)=>{
    try{
        const resultInfo = await order.readPaymentInfo(req);
        const fileOption = await order.readFileOption(req);
        let order_price=0;
        fileOption.forEach(function (element) {
            order_price += element.file_price;
            // 파일 페이지 범위
            // 전체 인쇄일 경우
            if(element.file_range_end === 0) element.file_range= '전체 페이지';
            // 범위 설정 인쇄일 경우
            else element.file_range = element.file_range_start +'~'+ element.file_range_end;
            delete element.file_range_end;
            delete element.file_range_start;
        })
        const result = {
            store_name: resultInfo.store_name,
            store_idx: resultInfo.store_idx,
            fileOption,
            order_price: order_price,
            user_point: resultInfo.user_point,
            user_remain_point: resultInfo.user_point - order_price
        }

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PAYMENT_INFO_SUCCESS, result));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};

exports.readOptions = async (req,res)=>{
    try{
        const fileOption = await order.readFileOption2(req);
        // 파일 페이지 범위
        // 전체 인쇄일 경우
        if(fileOption.file_range_end === 0) fileOption.file_range= '전체 페이지';
        // 범위 설정 인쇄일 경우
        else fileOption.file_range = fileOption.file_range_start +'~'+ fileOption.file_range_end;
        delete fileOption.file_range_end;
        delete fileOption.file_range_start;

        await getPage();

        // 성공
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_PAYMENT_INFO_SUCCESS, fileOption));
    } catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
};