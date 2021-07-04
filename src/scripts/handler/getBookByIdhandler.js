const books = require('../books');
const responseErrorHelperHapi = require('../utils/response-helper');

const getBookByIdhandler = (req, h) => {
    const { id } = req.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    return responseErrorHelperHapi({
        hapi: h,
        status: 'fail',
        message: 'Buku tidak ditemukan',
        codeStatus: 404,
    });
};

module.exports = getBookByIdhandler;
