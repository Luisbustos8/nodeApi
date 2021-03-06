var express = require('express');
var router = express.Router();
const {query, param,  validationResult} = require('express-validator')

/* GET home page. */
router.get('/', function(req, res, next) {

  

  res.render('index');
});


//Solo peticiones GET
router.get('/parametro/:dato', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);

  res.send('He recibido el dato:' + dato)
});

router.get('/parametrofiltrado/:dato([0-9]+)', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

router.get('/parametrofiltrado/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

router.get('/parametros/:dato/piso/:piso/puerta/:puerta', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

// Recibir dato Query String 
// /querystring?dato=20
router.get('/querystring', [
   query('dato').isNumeric().withMessage('Se necesita un valor numérico')
  ], (req, res, next) => {
  validationResult(req).throw()
  const dato = req.query.dato;
  console.log(req.query);
  res.send('He recibido el dato:' + dato );
})

router.post('/enelbody', (req, res, next) => {
  console.log(req.body);
  console.log('Headers:', req.get('Content-type'))
  res.send('He recibido el dato:' + req.body.numero );
})

module.exports = router;
