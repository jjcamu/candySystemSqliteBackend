//modelo utilizado para trabajar con la coleccion 'login', que almacena la contraseña de ingreso al sistema

var mongoose = require('mongoose');


const loginSchema = new mongoose.Schema ({ // creamos un nuevo esquema de datos. 

    pass: String,


})

module.exports = mongoose.model ('login', loginSchema) //creo un modelo, segun el esquema definido, 
//y lo asocio a la coleccion (tabla) 'login'. Exporto este modelo creado como un modulo para ser utilizado .