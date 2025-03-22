const {Router} = require('express') //importo la funcion Router del modulo 'express'
const router = Router() 

//Importo el controlador para utilizar sus funciones
const  { getPedidos, createPedido, eliminaPedido, cancelaPedido } = require('../controllers/pedidos.controller')
//destructuro el modulo importado en sus diferentes propiedades. 
//Cada propiedad almacena una funcion definida en 'pedidos.controller'


//configuro cada ruta segun el tipo de peticion que recibo del cliente.

router.route('/') 
// aca proceso las peticiones recibidas por la url '/api/pedidos/'  (http://localhost:4000/api/pedidos/)
//(ver "app.use('/api/pedidos', require('./routes/pedidos.js'))" del modulo 'app.js' )


    .get(getPedidos) // get: peticion de consulta  (mostrar pedidos)
    .post(createPedido) // post: enviar informacion (crear pedido)
    

router.route('/:parametro') //cuando se ingresa por la url (ruta) un parametro

    .delete(eliminaPedido) // peticion de borrar (la hago recibiendo un parametro desde el front, ya que no me funciona de otra manera)

router.route('/cancelar/:parametro') //cuando se ingresa por la url (ruta) un parametro

    .delete(cancelaPedido) // peticion de borrar pero con una logica adicional

module.exports = router;