// Sistema para el Control de Stock de Insumos Candy System - creado por Juan Jose Camussi 2024
// Backend 
//MODULO PRINCIPAL (node debe ejecutar este archivo)

//Importante: iniciar la base de datos de MongoDB antes , con el comando $ mongod .

require ('dotenv').config() //al importar este modulo, el servidor podra leer las variables de entorno.
//Debe importarse antes que el servidor, para que el servidor pueda hallar esas variables.

//importo el servidor (archivo app.js)
const app = require ('./app')

//importo la conexion a la base de datos (archivo database.js)
require ('./database')

async function main () //funcion principal 
{
        await app.listen (app.get('port'))//indico al servidor el puerto que debe ser escuchado

        console.log ('El servidor a la escucha del puerto', app.get('port'))
}
    
    
    main();