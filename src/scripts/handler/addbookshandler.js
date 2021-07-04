const { nanoid } = require('nanoid');
const books = require('../books');
const responseErrorHelperHapi = require('../utils/response-helper');

const addbookshandler = (req, h) => {
    const id = nanoid(16);
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

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: ((pageCount === readPage)),
        reading,
        insertedAt,
        updatedAt,
    };

    if ((name !== undefined) && (name !== null) && (name !== '')) {
        if (!(readPage > pageCount)) {
            books.push(newBook);
            const isSuccess = books.filter((book) => book.id === id).length > 0;
            if (isSuccess) {
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil ditambahkan',
                    data: {
                        bookId: id,
                    },
                });
                response.code(201);
                return response;
            }

            return responseErrorHelperHapi({
                hapi: h,
                status: 'error',
                message: 'Buku gagal ditambahkan',
                codeStatus: 500,
            });
        }

        return responseErrorHelperHapi({
            hapi: h,
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            codeStatus: 400,
        });
    }

    return responseErrorHelperHapi({
        hapi: h,
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
        codeStatus: 400,
    });
};

module.exports = addbookshandler;
