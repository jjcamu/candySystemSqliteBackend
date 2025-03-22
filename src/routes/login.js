const {Router} = require('express') //importo la funcion Router del modulo 'express'
const router = Router() 

const  {getPass} = require('../controllers/login.controller')

router.route('/') 

    .post(getPass)  //en realidad, se trata de un metodo 'get', pero axios no me permite enviar cuerpos (body) con datos
                    //en una peticion get, por lo tanto empleo un metodo 'post'

    
module.exports = router;