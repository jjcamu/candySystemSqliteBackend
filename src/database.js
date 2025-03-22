//conexion a la base de datos


const sqlite = require ('sqlite3');//importo el modulo que me permite que el servidor interactue
//con la base de datos

const db = new sqlite.Database("../candySystemDB.db" , sqlite.OPEN_READWRITE, (error) => {
    if (error){
        console.error(error)
    }else{
        console.log('El servidor se ha conectado a la base de datos!')
    }

});


module.exports = db ; 



