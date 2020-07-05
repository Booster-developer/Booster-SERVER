module.exports = {
    success: (status, message, data) => {
        return {
            status: status,
            success: success,
            message: message,
            data: data
        }
    },
    successWithoutData: (status, message, data) => {
        return {
            status: status,
            success: success,
            message: message
        }
    },
    fail: (status, message) => {
        return {
            status: status,
            success: false,
            message: message
        }
    },
};
