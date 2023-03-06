var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', async (req, res, next) => {

  try {
      bienvenido = ('Bienvenido a TIINIK-BACKEND');
      const ahora = new Date();
      res.render('index', { 
        title: 'TIINIK',
        fechaActual: ahora.toLocaleDateString()
      })

  } catch (err) {
      next(err);
  }

});

 
module.exports = router;
