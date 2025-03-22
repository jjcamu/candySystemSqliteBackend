//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const consumosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD

const modeloConsumos = require ('../models/consumos.js')  //importo el modelo 

const mongoose = require ('mongoose')

//Mostrar tabla de consumos
consumosCtrl.getConsumos = async (req, res) =>{ 

    const consumos = await modeloConsumos.find() 


    res.json(consumos) //devuelvo como respuesta al cliente, los documentos en formato json.

}

//Crear documento

consumosCtrl.createConsumo = async (req, res) => { // proceso las peticiones 'post' 



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

}

// Actualizar documentos

consumosCtrl.updateConsumos = async (req,res) => {

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


}

//Elimina documento segun su _id


consumosCtrl.eliminaConsumo =  async (req,res) => {

    var _idDelConsumo = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloConsumos.remove({ _id: _idDelConsumo }) //buscar documento cuyo _id sea '_idDelConsumo' y borrarlo.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE


}

module.exports = consumosCtrl ; 