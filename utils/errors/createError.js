const createError = (message, status) => {
    const newError = new Error (message);
    newError.status = status;
    return newError
};

module.exports = createError;