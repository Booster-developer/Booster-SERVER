const jwt = require('../modules/jwt');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const checkToken = {
    checkToken: async (req, res, next) => {
        var token = req.headers.token;
        // 토큰 없음
        if (!token)
            return res.json(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
        // decode
        const user = await jwt.verify(token);
        // 유효기간 만료
        if (user === TOKEN_EXPIRED)
            return res.json(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
        // 유효하지 않는 토큰
        if (user === TOKEN_INVALID)
            return res.json(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        if (user.user_idx === undefined)
            return res.json(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        req.user_idx = user.user_idx;
        next();
    }
}

module.exports = checkToken;