
var mongoose = require('mongoose');


const consumosSchema = new mongoose.Schema ({ // creamos un nuevo esquema de datos. 

    id: Number, // el DataGrid de material ui , me exige un id por cada fila (documento en este caso) de la tabla
    producto: String,
    insumo: String,
    consumoPorTachada: Number,
    unidadInsumo: String

},
{

    timestamps: true // que se guarde la fecha y hora de la creacion o actualizacion del documento

})



module.exports = mongoose.model ('consumos', consumosSchema) //creo un modelo, segun el esquema definido, 
