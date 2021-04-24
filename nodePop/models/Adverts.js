'use strict';

const mongoose = require('mongoose');

const advertsSchema = mongoose.Schema({
    name: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: []
});

const Anuncios = mongoose.model('Anuncios', advertsSchema);

module.exports = Anuncios;