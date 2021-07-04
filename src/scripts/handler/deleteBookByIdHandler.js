const books = require('../books');
const responseErrorHelperHapi = require('../utils/response-helper');

const deleteBookByIdHandler = (req, h) => {
    const { id } = req.params;

    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    return responseErrorHelperHapi({
        hapi: h,
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
        codeStatus: 404,
    });
};

module.exports = deleteBookByIdHandler;
