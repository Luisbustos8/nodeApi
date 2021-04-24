var express = require('express');
const { Result } = require('express-validator');
var router = express.Router();

const Anuncios = require('../../models/Adverts');

/* GET /api/anuncios */
router.get('/', function (req, res, next){
    Anuncios.find((err, resultado) => {
        if(err) {
            next(err);
            return
        }
        res.json(resultado)
    })
})

module.exports = router;