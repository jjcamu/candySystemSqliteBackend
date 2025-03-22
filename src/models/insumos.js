
var mongoose = require('mongoose');


const insumosSchema = new mongoose.Schema ({ // creamos un nuevo esquema de datos. 

    id: Number, // el DataGrid de material ui , me exige un id por cada fila (documento en este caso) de la tabla
    nombre: String,
    cantidad: Number,
    unidad: String,
    limite: Number  // cantidad limite de insumo (una cantidad menor mostrará un cartel de advertencia)

},
{

    timestamps: true // que se guarde la fecha y hora de la creacion o actualizacion del documento

})



module.exports = mongoose.model ('insumos', insumosSchema) //creo un modelo, segun el esquema definido, 
