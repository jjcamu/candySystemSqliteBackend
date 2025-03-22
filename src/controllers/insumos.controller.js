//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const insumosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD

const modeloInsumos = require ('../models/insumos.js')  //importo el modelo 



const mongoose = require ('mongoose')

//Mostrar insumos
insumosCtrl.getInsumos = async (req, res) =>{ 


    const insumos = await modeloInsumos.find({}, null, {sort: {nombre: 1}} )//le pedimos a modeloInsumos, que nos devuelva todos los 
    //documentos de la coleccion 'insumos', los ordene por nombre de manera descendente, y lo almacene en la constante insumos.
    // Los documentos se guardaran en un formato de array de objetos.

    res.json(insumos) //devuelvo como respuesta al cliente, los documentos en formato json.

}

//Crear insumo

insumosCtrl.createInsumo = async (req, res) => { // proceso las peticiones 'post' 

    const {nombre, cantidad, unidad, limite} = req.body; 

    const nuevoInsumo = new modeloInsumos ({ //creo un nuevo modelo segun el esquema (schema) que establece 'modeloInsumos'.

        nombre: nombre,
        cantidad: cantidad,
        unidad: unidad,
        limite: limite

    })

    await nuevoInsumo.save(); //como nuevoInsumo es un modelo de mongoose, utilizo su funcion 'save' para almacenar este nuevo insumo en
    // la base de datos. Al tratarse de la instruccion asincrona de esta "async function", antepondremos el operador 'await' 


    res.json ({message: 'Se ha creado !'}) //devuelvo una respuesta al cliente 

}

// Actualizar insumos

insumosCtrl.updateInsumos = async (req,res) => {

    const {_id, nombre, cantidad, unidad, limite} = req.body; //deconstruyo el contenido del cuerpo de la peticion

    await modeloInsumos.update({_id: _id}, {
        //{_id:_id} indica que voy a actualizar el documento de la coleccion 'insumos' cuyo _id sea el mismo que el _id del 
        //objeto proveniente del frontend.
        //esto lo hago para que la fila modificada en el dataGrid coincida con la fila de la BBDD.
        //Como segundo parametro de la query, indico los campos que van a actualizarse
        nombre,    //esto es lo mismo que escribir   nombre: nombre 
        cantidad,    //
        unidad,
        limite

    });


    res.json({message: 'actualizado!'})


}

//Elimina insumo segun su _id


insumosCtrl.eliminaInsumo =  async (req,res) => {

    var _idDelInsumo = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloInsumos.remove({ _id: _idDelInsumo }) //buscar documento cuyo _id sea '_idDelInsumo' y borrarlo.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE

}






module.exports = insumosCtrl ; 