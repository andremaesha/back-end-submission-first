const addbookshandler = require('./handler/addbookshandler');
const getAllbooksHandler = require('./handler/getAllbooksHandler');
const getBookByIdhandler = require('./handler/getBookByIdhandler');
const editBookByIdhandler = require('./handler/editBookByIdhandler');
const deleteBookByIdHandler = require('./handler/deleteBookByIdHandler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addbookshandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllbooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdhandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdhandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;
