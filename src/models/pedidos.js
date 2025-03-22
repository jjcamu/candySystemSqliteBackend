
var mongoose = require('mongoose');


const pedidosSchema = new mongoose.Schema ({ // creamos un nuevo esquema de datos. 
    //Este es el esquema que usaran los documentos de la coleccion 'pedidos'.

    dia: String,
    cantidad: String,
    producto: String,

},
{

    timestamps: true // que se guarde la fecha y hora de la creacion o actualizacion del documento

})

module.exports = mongoose.model ('pedidos', pedidosSchema) //creo un modelo, segun el esquema definido, 
//y lo asocio a la coleccion (tabla) 'pedidos'. Exporto este modelo creado como un modulo para ser utilizado .