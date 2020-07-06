module.exports = {
    success: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    successWithoutData: (status, message) => {
        return {
            status: status,
            success: true,
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
