var express = require('express');
const { Result } = require('express-validator');
const { route } = require('..');
const { id } = require('../../lib/connectMongoose');
var router = express.Router();

const Anuncios = require('../../models/Adverts');

/* GET /api/anuncios */
router.get('/', async function(req, res, next) {
    try{
        const name = req.query.name;
        const precio = req.query.precio;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};
        if (name) {
            filter.name = name;
        };
        if (precio) {
            filter.precio = precio;
        };

        const result = await Anuncios.list(filter, limit, skip, fields, sort);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncio = await Anuncios.findOne({_id: _id})
        res.json(anuncio);
        if(!anuncio){
            return res.status(404).json({error: 'not found'})
        }
        res.json({result: anuncio});
    } catch(err) {
        next(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        const anuncioData = req.body;

        const anuncio = new Anuncios(anuncioData)

        const nuevoAnuncio = await anuncio.save();

        res.status(201).json({result: nuevoAnuncio});
    } catch(err) {
        next(err);
    }
})

//Actualizar anuncio

router.put('/:id', async(req, res, next) => {
    try{
        const _id = req.params.id;
        const anuncioData = req.body;

        const anuncioActualizado = await Anuncios.findOneAndUpdate({ _id: _id}, anuncioData, {new: true});

        res.json({result: anuncioActualizado})
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncios.deleteOne({_id: _id});

        res.json();
    } catch (error) {
        next(error)
    }
})

module.exports = router;