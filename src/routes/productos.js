const {Router} = require('express') //importo la funcion Router del modulo 'express'
const router = Router() 

//Importo el controlador para utilizar sus funciones
const  { getProductos , createProducto, eliminaProducto } = require('../controllers/productos.controller')



//configuro cada ruta segun el tipo de peticion que recibo del cliente.

router.route('/') 



    .get(getProductos) 
    .post(createProducto) 

router.route(('/:parametro')) //cuando se ingresa por la url (ruta) un parametro

    .delete(eliminaProducto) // peticion de borrar (la hago recibiendo un parametro desde el front)
    //.delete(cancelaPedido) // peticion de borrar pero con una logica adicional

module.exports = router;