//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const db = require("../database"); // importo la conexion a la base de datos


const productosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD



//Mostrar productos

productosCtrl.getProductos = (req, res) =>{ 


    db.all(`SELECT * FROM productos ORDER BY nombre `, [], function (err, row) {
    //devuelve todos los registros de la tabla, ordenados por 'dia' de forma descendente, y si hay mas de un
    //registro con el mismo dia, los ordena por _id (por orden de guardado) de forma ascendente.
        try {

            res.json(row) //devuelvo respuesta al cliente. 'row' son los registros devueltos por la consulta.

        } catch (e) {
            throw e;
        }
    })

}




/* productosCtrl.getProductos = async (req, res) =>{ 

    const productos = await modeloProductos.find() 

    res.json(productos) //devuelvo como respuesta al cliente, los documentos en formato json.

} */

//Crear nuevo producto

productosCtrl.createProducto = async (req, res) => {// proceso las peticiones 'post' 
    
    const {nombre} = req.body; 

        db.all(`INSERT INTO productos (nombre) VALUES ("${nombre}") `, [], function (err, row) {
 
            try {

                res.json({message: 'ok!'})
    
            } catch (e) {
                throw e;
            }
        })
    
}    

/* productosCtrl.createProducto = async (req, res) => { // proceso las peticiones 'post' 


    const {nombre} = req.body; 

    const nuevoProducto = new modeloProductos ({ //creo un nuevo modelo segun el esquema (schema) que establece 'modeloProductos'.

        nombre: nombre,

    })


    await nuevoProducto.save(); 


    res.json ({message: 'Se ha creado !'}) //devuelvo una respuesta al cliente por consola (en formato json)

} */

//Elimina producto segun su nombre


productosCtrl.eliminaProducto =  async (req,res) => {

    var nombreProducto = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await db.all(`DELETE FROM productos WHERE nombre = "${nombreProducto}"`, [], function (err, row) {
       //buscar registro cuyo nombre sea 'nombreProducto' y borrarlo.
            try {
                res.json({message: 'borrado!'})


            } catch (e) {
                throw e;
            }
        })
    
    }

/* productosCtrl.eliminaProducto =  async (req,res) => {

    var nombreProducto = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloProductos.remove({ nombre: nombreProducto }) //buscar todos los documentos cuyo nombre sea el especificado
    //en 'nombreProducto' , y borrarlos.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE


} */


module.exports = productosCtrl ; 