const {Router} = require('express') //importo la funcion Router del modulo 'express'
const router = Router() 

const  { getInsumos, updateInsumos , createInsumo, eliminaInsumo} = require('../controllers/insumos.controller')

router.route('/') 

    .get(getInsumos) // get: peticion de consulta  
    .put(updateInsumos) // actualizacion de todos los documentos
    .post(createInsumo) // post: crear documento

router.route(('/:parametro')) //cuando se ingresa por la url (ruta) un parametro

    .delete(eliminaInsumo) // peticion de borrar (la hago recibiendo un parametro desde el front)



    
module.exports = router;