const responseErrorHelperHapi = ({
    hapi, status, message, codeStatus,
}) => {
    const response = hapi.response({
        status,
        message,
    });
    response.code(codeStatus);

    return response;
};

module.exports = responseErrorHelperHapi;
