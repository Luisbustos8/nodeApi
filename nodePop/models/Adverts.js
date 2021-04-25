'use strict';

const mongoose = require('mongoose');

const advertsSchema = mongoose.Schema({
    name: {type: String, index: true},
    venta: {type: Boolean, index: true},
    precio: {type: Number, index: true},
    photo: String,
    tags: []
});

advertsSchema.statics.list = function (filter, limit, skip, fields, sort) {
    const query = Anuncios.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}




const Anuncios = mongoose.model('Anuncios', advertsSchema);


module.exports = Anuncios;