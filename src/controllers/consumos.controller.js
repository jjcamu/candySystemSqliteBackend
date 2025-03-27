//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const consumosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD

const db = require("../database"); // importo la conexion a la base de datos

//Mostrar tabla de consumos

consumosCtrl.getConsumos = async (req, res) => {  


    db.all(`SELECT * FROM consumos ORDER BY producto `, [], function (err, row) {
    //devuelve todos los registros de la tabla, ordenados por 'producto' 
        try {

            res.json(row) //devuelvo respuesta al cliente. 'row' son los registros devueltos por la consulta.

        } catch (e) {
            throw e;
        }
    })

}


/* consumosCtrl.getConsumos = async (req, res) =>{ 

    const consumos = await modeloConsumos.find() 


    res.json(consumos) //devuelvo como respuesta al cliente, los documentos en formato json.

} */

//Insertar registro

consumosCtrl.createConsumo = async (req, res) => {// proceso las peticiones 'post' 
    
    const {producto, insumo, consumoPorTachada, unidadInsumo} = req.body; 

        db.all(`INSERT INTO consumos (producto, insumo, consumoPorTachada, unidadInsumo) VALUES ("${producto}", "${insumo}" , "${consumoPorTachada}" , "${unidadInsumo}" ) `, [], function (err, row) {
        //insertar registro en la tabla consumos
            try {

                res.json({message: 'ok!'})
    
            } catch (e) {
                throw e;
            }
        })
    
}    

/* consumosCtrl.createConsumo = async (req, res) => { // proceso las peticiones 'post' 



    const {producto, insumo, consumoPorTachada, unidadInsumo} = req.body; 



    const nuevoConsumo = new modeloConsumos ({ //creo un nuevo modelo segun el esquema (schema) que establece 'modeloPedidos'.


        producto: producto,
        insumo: insumo,
        consumoPorTachada: consumoPorTachada,
        unidadInsumo: unidadInsumo

    })


    await nuevoConsumo.save(); //como nuevoPedido es un modelo de mongoose, utilizo su funcion 'save' para almacenar este nuevo pedido en
    // la base de datos. Al tratarse de la instruccion asincrona de esta "async function", antepondremos el operador 'await' 


    res.json ({message: 'Se ha creado !'}) //devuelvo una respuesta al cliente por consola (en formato json)

} */

// Actualizar registros

consumosCtrl.updateConsumos = async (req,res) => {

    const {_id, producto, insumo, consumoPorTachada, unidadInsumo} = req.body; //deconstruyo el contenido del cuerpo de la peticion

    await db.get(`UPDATE consumos SET producto = "${producto}" ,
    insumo = "${insumo}" ,
    consumoPorTachada = "${consumoPorTachada}" ,
    unidadInsumo = "${unidadInsumo}" 
    
    WHERE _id = "${_id}" `, [], function (err, row) {
    //actualizar los campos : producto, insumo, etc.. de la tabla 'consumos' cuyo campo '_id' sea 'id_'    
            try {
                res.json({message: 'actualizado!'})
                //atencion! : por algun extraño motivo, si no devuelvo respuesta , el bucle for del cliente no
                //seguira iterando...

            } catch (e) {
                throw e;
            }
        })
    
    }

/* consumosCtrl.updateConsumos = async (req,res) => {

    const {_id, producto, insumo, consumoPorTachada, unidadInsumo} = req.body; //deconstruyo el contenido del cuerpo de la peticion

    await modeloConsumos.update({_id: _id}, {
        //{_id:_id} indica que voy a actualizar el documento de la coleccion 'consumos' cuyo _id sea el mismo que el _id del 
        //objeto proveniente del frontend.
        //esto lo hago para que la fila modificada en el dataGrid coincida con la fila de la BBDD.
        //Como segundo parametro de la query, indico los campos que van a actualizarse
        producto,    //esto es lo mismo que escribir   producto:producto 
        insumo,    //
        consumoPorTachada,
        unidadInsumo

        

    });


    res.json({message: 'actualizado!'})


} */

//Elimina registro segun su _id


consumosCtrl.eliminaConsumo =  async (req,res) => {

    var _idDelConsumo = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await db.all(`DELETE FROM consumos WHERE _id = "${_idDelConsumo}"`, [], function (err, row) {
       //buscar registro cuyo _id sea '_idDelConsumo' y borrarlo.
            try {
                res.json({message: 'borrado!'})
                //atencion! : por algun extraño motivo, si no devuelvo respuesta , el bucle for del cliente no
                //seguira iterando...

            } catch (e) {
                throw e;
            }
        })
    
    }

/* consumosCtrl.eliminaConsumo =  async (req,res) => {

    var _idDelConsumo = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloConsumos.remove({ _id: _idDelConsumo }) //buscar documento cuyo _id sea '_idDelConsumo' y borrarlo.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE


} */

module.exports = consumosCtrl ; 