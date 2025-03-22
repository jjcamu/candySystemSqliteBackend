//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const db = require("../database"); // importo la conexion a la base de datos

const loginCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD



//Consultar contraseña
loginCtrl.getPass = (req, res) =>{ 

    const {pass} = req.body;  // guardo la contraseña ingresada por el usuario en 'pass'



    db.get(`SELECT * FROM logins WHERE pass LIKE "${pass}"`, [], function (err, row) {
        try {

            res.json(row) //devuelvo respuesta al cliente. 'row' es el registro devuelto por la consulta.

        } catch (e) {
            throw e;
        }
    })

}

module.exports = loginCtrl ; 