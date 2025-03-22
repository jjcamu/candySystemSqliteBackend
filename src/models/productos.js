
var mongoose = require('mongoose');


const productosSchema = new mongoose.Schema ({ // creamos un nuevo esquema de datos. 
    //Este es el esquema que usaran los documentos de la coleccion 'productos'.

    nombre: String


},
{

    timestamps: true // que se guarde la fecha y hora de la creacion o actualizacion del documento

})

module.exports = mongoose.model ('productos', productosSchema) //creo un modelo, segun el esquema definido, 
//y lo asocio a la coleccion (tabla) 'productos'. Exporto este modelo creado como un modulo para ser utilizado .