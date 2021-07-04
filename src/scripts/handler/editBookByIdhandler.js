const books = require('../books');
const responseErrorHelperHapi = require('../utils/response-helper');

const editBookByIdhandler = (req, h) => {
    const { id } = req.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if ((name !== undefined) && (name !== null) && (name !== '')) {
        if (!(readPage > pageCount)) {
            if (index !== -1) {
                books[index] = {
                    ...books[index],
                    name,
                    year,
                    author,
                    summary,
                    publisher,
                    pageCount,
                    readPage,
                    reading,
                    updatedAt,
                };
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil diperbarui',
                });
                response.code(200);
                return response;
            }
            return responseErrorHelperHapi({
                hapi: h,
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
                codeStatus: 404,
            });
        }
        return responseErrorHelperHapi({
            hapi: h,
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            codeStatus: 400,
        });
    }
    return responseErrorHelperHapi({
        hapi: h,
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        codeStatus: 400,
    });
};

module.exports = editBookByIdhandler;
