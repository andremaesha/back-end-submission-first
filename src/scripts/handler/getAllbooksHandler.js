const books = require('../books');
const RegexBool = require('../utils/regexFunction/regexReturnBool');

const getAllbooksHandler = (req, h) => {
    const { name, reading, finished } = req.query;
    const newBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));
    const isSuccess = (books.length > 0);

    // Show all books containing names based on the value given
    if (name !== undefined) {
        const nameBooks = books.map((item) => item.name);
        if (RegexBool(name, nameBooks)) {
            const response = h.response({
                status: 'success',
                data: {
                    books: newBooks.filter((b) => RegexBool(name, b.name)),
                },
            });
            response.code(200);
            return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'query tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    // get all Reading and unreading books
    if (reading !== undefined) {
        const filterReadingBookTrue = books.filter((book) => book.reading).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const filterReadingBookFalse = books.filter((book) => !book.reading).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));

        // 1 = true; 0 = false
        if (reading > 0) {
            return {
                status: 'success',
                data: {
                    books: filterReadingBookTrue,
                },
            };
        }
        return {
            status: 'success',
            data: {
                books: filterReadingBookFalse,
            },
        };
    }

    if (finished !== undefined) {
        const finishedBookTrue = books.filter((book) => book.finished).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const finishedBookFalse = books.filter((book) => !book.finished).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        if (finished > 0) {
            return {
                status: 'success',
                data: {
                    books: finishedBookTrue,
                },
            };
        }
        return {
            status: 'success',
            data: {
                books: finishedBookFalse,
            },
        };
    }

    // get all books
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            data: {
                books: newBooks,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Data masih kosong',
        data: {
            books,
        },
    });
    response.code(501);
    return response;
};

module.exports = getAllbooksHandler;
