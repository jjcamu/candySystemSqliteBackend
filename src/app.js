
//CREO EL SERVIDOR

//importo los modulos
const express = require ('express') //express es un framework de node, que me facilita la programacion del servidor
const cors = require ('cors')  // este modulo me permite la conexion entre frontend y backend

//creo una aplicacion de express (estoy creando el servidor)
const app = express()

//configuro el servidor


app.set ('port', 4000 || process.env.PORT) //El puerto a escuchar es el 4000 ó el puerto asignado por el entorno de produccion. 

app.use(cors())

app.use(express.json()) //indico al sistema que para las peticiones y respuestas, se usará el formato json.


//DEFINO LAS RUTAS QUE ME CONECTARAN A CADA API 

//'/api/pedidos' es la ruta que nos conecta a la api de pedidos . (http://localhost:4000/api/pedidos)
//vinculo la ruta '/api/pedidos' con la configuracion de ruta definida en 'routes/pedidos.js'. 
app.use('/api/pedidos', require('./routes/pedidos.js')) 
app.use('/api/productos', require('./routes/productos.js')) 
app.use ('/api/insumos', require('./routes/insumos.js'))
app.use ('/api/consumos', require('./routes/consumos.js'))
app.use ('/api/login', require('./routes/login.js'))




module.exports = app //exporto la aplicacion de express (el servidor), para ser utilizado en otro modulo del proyecto

