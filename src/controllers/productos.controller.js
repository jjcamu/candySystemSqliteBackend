//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const productosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD

const modeloProductos = require ('../models/productos.js')  //importo el modelo 

const mongoose = require ('mongoose')

//Mostrar productos
productosCtrl.getProductos = async (req, res) =>{ 

    const productos = await modeloProductos.find() 

    res.json(productos) //devuelvo como respuesta al cliente, los documentos en formato json.

}

//Crear nuevo producto

productosCtrl.createProducto = async (req, res) => { // proceso las peticiones 'post' 


    const {nombre} = req.body; 

    const nuevoProducto = new modeloProductos ({ //creo un nuevo modelo segun el esquema (schema) que establece 'modeloProductos'.

        nombre: nombre,

    })


    await nuevoProducto.save(); 


    res.json ({message: 'Se ha creado !'}) //devuelvo una respuesta al cliente por consola (en formato json)

}

//Elimina producto segun su nombre


productosCtrl.eliminaProducto =  async (req,res) => {

    var nombreProducto = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloProductos.remove({ nombre: nombreProducto }) //buscar todos los documentos cuyo nombre sea el especificado
    //en 'nombreProducto' , y borrarlos.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE


}


module.exports = productosCtrl ; 