const {Router} = require('express') //importo la funcion Router del modulo 'express'
const router = Router() 

const  { getConsumos, createConsumo, updateConsumos, eliminaConsumo  } = require('../controllers/consumos.controller')

router.route('/') 

    .get(getConsumos) // get: peticion de consulta  
    .post(createConsumo) // post: crear documento
    .put(updateConsumos) // actualizacion de todos los documentos

router.route(('/:parametro')) //cuando se ingresa por la url (ruta) un parametro

    .delete(eliminaConsumo) // peticion de borrar (la hago recibiendo un parametro desde el front)
    //.delete(cancelaPedido) // peticion de borrar pero con una logica adicional

    
module.exports = router;