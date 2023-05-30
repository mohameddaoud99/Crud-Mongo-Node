const mongoose = require('mongoose');

let db;

module.exports = function connection() {
    if (!db) {
        db = mongoose.createConnection('mongodb://mongo:27017/crud-example', {
            useNewUrlParser: true
        });
    }

    return db;
}