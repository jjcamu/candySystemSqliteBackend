//el controlador almacena la logica que procesará las peticiones recibidas del cliente, e interactuará con la BBDD a traves del modelo.

const db = require("../database"); // importo la conexion a la base de datos


const pedidosCtrl = {} //creo un objeto, cuyas propiedades seran cada una de las operaciones a realizar en la BBDD



//Mostrar pedidos

pedidosCtrl.getPedidos = (req, res) =>{ 


    db.all(`SELECT * FROM pedidos ORDER BY dia DESC , _id ASC`, [], function (err, row) {
    //devuelve todos los registros de la tabla, ordenados por 'dia' de forma descendente, y si hay mas de un
    //registro con el mismo dia, los ordena por _id (por orden de guardado) de forma ascendente.
        try {

            res.json(row) //devuelvo respuesta al cliente. 'row' son los registros devueltos por la consulta.

        } catch (e) {
            throw e;
        }
    })

}



/* pedidosCtrl.getPedidos = async (req, res) =>{ 



    const pedidos = await modeloPedidos.find({}).sort({dia:'desc', _id:'asc'})


    //le pido a modeloPedidos, que me devuelva todos los documentos de la coleccion 'pedidos', pero que los ordene por 'dia' de
    //forma descendente, y en el caso de repetirse varios documentos con el mismo 'dia', estos se ordenen a su vez en forma ascendente.
    // Los documentos se guardaran en un formato de array de objetos.
    //El orden descendente de los dias, es para poder ver primero las fechas mas recientes.
    //El orden ascendente del '_id' es para que se muestren los pedidos de una misma fecha, en el orden en que fueron guardados.


    res.json(pedidos) //devuelvo como respuesta al cliente, los documentos en formato json.

} */


//Crear pedido

pedidosCtrl.createPedido = async (req, res) => { // proceso las peticiones 'post' 

const {dia, cantidad, producto} = req.body; 

var documentosEnBson2 = await ejecutar(`INSERT INTO pedidos (dia, cantidad, producto) VALUES ("${dia}", "${cantidad}" , "${producto}" ) `);

/* const nuevoPedido = new modeloPedidos ({ //creo un nuevo modelo segun el esquema (schema) que establece 'modeloPedidos'.

    dia: dia,
    cantidad: cantidad,
    producto: producto

})


await nuevoPedido.save(); //como nuevoPedido es un modelo de mongoose, utilizo su funcion 'save' para almacenar este nuevo pedido en
// la base de datos. Al tratarse de la instruccion asincrona de esta "async function", antepondremos el operador 'await' 
 */

var advertencias = await actualizarInsumoPorPedido(cantidad, producto)  //actualizar la cantidad de insumos, 
//y guardar las advertencias emitidas por escaces o falta de algun insumo.


res.json({message: advertencias })

}

//Elimina pedido segun su fecha

pedidosCtrl.eliminaPedido = (req, res) =>{ 

    var dia = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url


    db.all(`DELETE FROM pedidos WHERE dia = "${dia}"`, [], function (err, row) {
    //eliminar de la tabla pedidos todos los registros cuyo dia sea el ingresado por el usuario
        try {


        } catch (e) {
            throw e;
        }
    })

}



/* pedidosCtrl.eliminaPedido =  async (req,res) => {

    var fecha = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url

    await modeloPedidos.remove({ dia: fecha }) //buscar todos los documentos cuyo dia sea 'fecha'
    // y borrarlos.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE

} */

//ACTUALIZACION DE LOS INSUMOS, CUANDO SE CANCELA UN PEDIDO
//Elimina pedido segun su fecha y ademas, reestablece la cantidad de insumo en stock

pedidosCtrl.cancelaPedido =  async (req,res) => {

    var dia = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url



    db.all(`SELECT * FROM pedidos WHERE dia LIKE "${dia}"`, [], function (err, row) {
        ////guardo todos los documentos de la tabla pedidos
        //correspondientes al dia 'dia' en la variable 'row'. Se guardaran en formato BSON.
        try {

            var dataString = JSON.stringify(row); //convierto de BSON a cadena de texto JSON 

            var pedidoDeLaFecha = JSON.parse(dataString); //convierto a objeto JSON

            db.all(`DELETE FROM pedidos WHERE dia = "${dia}"`, [], async function (err, row) {
                //eliminar de la tabla pedidos todos los registros cuyo dia sea el ingresado por el usuario
                    try {

                        for (let i=0; i < pedidoDeLaFecha.length ; i++){  //////  iterar los productos pedidos en la fecha

                            var productoABuscar = pedidoDeLaFecha[i].producto

                            console.log('pedidoDeLaFecha')
                            console.log(pedidoDeLaFecha)
                            console.log(pedidoDeLaFecha.length)

                            
                            productoABuscar = productoABuscar.substring(0, productoABuscar.length );  // -2
                            //algunos strings almacenados en la BBDD guardan el salto de linea '/n' al final.
                            //Debo eliminar estos 2 caracteres con substring(), para que mongoose pueda encontrar los documentos. 
                    
                            var tachadasDeProducto = pedidoDeLaFecha[i].cantidad
                    
                            tachadasDeProducto = tachadasDeProducto.substring(0, tachadasDeProducto.length );  // -2
                    
                            console.log('productoABuscar')

                            console.log(productoABuscar)

                            var tachadasNumber
                    
                            if (tachadasDeProducto == '1 cargada') { tachadasNumber = 3 }
                            if (tachadasDeProducto == '1/2 cargada') { tachadasNumber = 1.5 }    
                            if (tachadasDeProducto == '1 tachada') { tachadasNumber = 1 }

                            console.log(tachadasNumber)

                            var documentosEnBson2 = await ejecutar(`SELECT * FROM consumos WHERE producto LIKE "${productoABuscar}"`);
                            
                    
/*                             db.all(`SELECT * FROM consumos WHERE producto LIKE "${productoABuscar}"`, [], function (err, documentosEnBson2) {
                            //busco en la tabla de consumos, todos los insumos que se gastan en el producto
                                    try { */

                                        console.log(documentosEnBson2)

                                        var dataString2 = JSON.stringify(documentosEnBson2); //convierto de BSON a cadena de texto JSON 

                                        var insumosDelProducto = JSON.parse(dataString2); //convierto a objeto JSON

                                        console.log('insumosDelProducto')

                                        console.log(insumosDelProducto)

                                        console.log(insumosDelProducto.length)
    

                                         
                                    

                                        for (let x = 0; x < insumosDelProducto.length; x++) {  //////  iterar los insumos gastados en el producto

                                            var insumoABuscar = insumosDelProducto[x].insumo

                                            console.log(insumoABuscar)

                                            var documentosEnBson3 = await ejecutar(`SELECT * FROM insumos WHERE nombre LIKE "${insumoABuscar}"`);

/*                                             db.all(`SELECT * FROM insumos WHERE nombre LIKE "${insumoABuscar}"`, [], function (err, documentosEnBson3) {
                                                //busco en la tabla de consumos, todos los insumos que se gastan en el producto
                                                try { */

                                                    var dataString3 = JSON.stringify(documentosEnBson3); //convierto de BSON a cadena de texto JSON 

                                                    var insumo = JSON.parse(dataString3); //convierto a objeto JSON

                                                    var cantidadStockInsumo = insumo[0].cantidad  // cantidad de insumo en stock

                                                    console.log(cantidadStockInsumo)

                                                    var insumoConsumido = insumosDelProducto[x].consumoPorTachada * tachadasNumber //insumo consumido
                                                    //necesito saber cuanto insumo se consumió, para saber cuanto insumo se repondrá en el stock de insumos

                                                    var nuevaCantidadDeInsumo = cantidadStockInsumo + insumoConsumido  // repongo (sumo) la cantidad de insumo consumido

                                                    console.log(nuevaCantidadDeInsumo)
                                                    // actualizo la cantidad de insumos en stock

                                                    await ejecutar(`UPDATE insumos SET cantidad = "${nuevaCantidadDeInsumo}" WHERE nombre = "${insumoABuscar}" `);

                                                    //db.get(`UPDATE insumos SET cantidad = "${nuevaCantidadDeInsumo}" WHERE nombre = "${insumoABuscar}" `, [], function (err, row) {
                                                        //buscar en tabla insumos el registro cuyo nombre sea el del insumo en cuestion, y actualizar el valor
                                                        // de su campo 'cantidad' con el nuevo valos 'nuevaCantidadDeInsumo'
                                                            


                                        }                          

            
                    }
                    } catch (e) {
                        throw e;
                    }
                })

        } catch (e) {
            throw e;
        }
    })




}


/* pedidosCtrl.cancelaPedido =  async (req,res) => {

    var fecha = req.params.parametro;  //datos que recibo desde el front a traves del parametro ingresado por url


    var documentosEnBson = await modeloPedidos.find({dia: fecha } ) //guardo todos los documentos de la tabla pedidos
    //correspondientes al dia 'fecha' . Se guardaran en formato BSON.

    var dataString = JSON.stringify(documentosEnBson); //convierto de BSON a cadena de texto JSON 

    var pedidoDeLaFecha = JSON.parse(dataString); //convierto a objeto JSON


    await modeloPedidos.remove({ dia: fecha }) //elimino de la tabla pedidos los documentos de la fecha.

    res.status(204).send('borrado!')//establezco el estado en 204 ,para que no me de error 'net::ERR_EMPTY_RESPONSE' en el método DELETE



    for (let i=0; i < pedidoDeLaFecha.length ; i++){  //////  iterar los productos pedidos en la fecha

        var productoABuscar = pedidoDeLaFecha[i].producto
        
        productoABuscar = productoABuscar.substring(0, productoABuscar.length - 2);  
        //algunos strings almacenados en la BBDD guardan el salto de linea '/n' al final.
        //Debo eliminar estos 2 caracteres con substring(), para que mongoose pueda encontrar los documentos. 

        var tachadasDeProducto = pedidoDeLaFecha[i].cantidad

        tachadasDeProducto = tachadasDeProducto.substring(0, tachadasDeProducto.length - 2);  


        var tachadasNumber

        if (tachadasDeProducto == '1 cargada') { tachadasNumber = 3 }
        if (tachadasDeProducto == '1/2 cargada') { tachadasNumber = 1.5 }    
        if (tachadasDeProducto == '1 tachada') { tachadasNumber = 1 }


        var documentosEnBson2 = await modeloConsumos.find({producto: productoABuscar } ) //busco en la tabla de consumos, todos los 
        //insumos que se gastan en el producto
        var dataString2 = JSON.stringify(documentosEnBson2); //convierto de BSON a cadena de texto JSON 
        
        var insumosDelProducto = JSON.parse(dataString2); //convierto a objeto JSON



        for (let x=0; x < insumosDelProducto.length ; x++){  //////  iterar los insumos gastados en el producto

            var insumoABuscar = insumosDelProducto[x].insumo 

            var documentosEnBson3 = await modeloInsumos.find({nombre: insumoABuscar } )
    
            var dataString3 = JSON.stringify(documentosEnBson3); //convierto de BSON a cadena de texto JSON 
    
            var insumo = JSON.parse(dataString3); //convierto a objeto JSON
    
            var cantidadStockInsumo = insumo[0].cantidad  // cantidad de insumo en stock
    
            var insumoConsumido = insumosDelProducto[x].consumoPorTachada * tachadasNumber //insumo consumido
            //necesito saber cuanto insumo se consumió, para saber cuanto insumo se repondrá en el stock de insumos
    
            var nuevaCantidadDeInsumo = cantidadStockInsumo + insumoConsumido  // repongo (sumo) la cantidad de insumo consumido
    
            // actualizo la cantidad de insumos en stock
            await modeloInsumos.update({nombre: insumoABuscar}, { cantidad: nuevaCantidadDeInsumo });
            // 1er argumento: localizo el documento de la tabla insumos cuyo nombre sea el del insumo en cuestion,
            // 2do arg : actualizo el contenido de su campo 'cantidad' con el nuevo valor 'nuevaCantidadDeInsumo'


        }
    }


}
 */


//ACTUALIZACION DE LOS INSUMOS, CADA VEZ QUE SE REALIZA UN PEDIDO

actualizarInsumoPorPedido =  async (cantidad, producto) => {  //logica para actualizar los insumos, segun los pedidos realizados,
    // y el gasto de insumo de cada producto del pedido.
    //// Por cada fila de la tabla de pedidos realizados, se ingresa a esta funcion

    var tachadasPedidas = cantidad.substring(0, cantidad.length - 2); ; // tachadas de producto

    var productoPedido = producto.substring(0, producto.length - 2);  //producto pedido.
    //los string provenientes del frontend vienen con el salto de linea '/n' al final, y debo eliminar estos 2 caracteres con substring(),
    // para que mongoose pueda encontrar mis documentos.


    var tachadasNumber // tachadas pedidas expresadas en numeros

    if (tachadasPedidas == '1 cargada') { tachadasNumber = 3 }
    if (tachadasPedidas == '1/2 cargada') { tachadasNumber = 1.5 }    
    if (tachadasPedidas == '1 tachada') { tachadasNumber = 1 }

    var info = []// aca guardare la informacion de los insumos faltantes o en escaces
    

    var documentosEnBson = await ejecutar(`SELECT * FROM consumos WHERE producto LIKE "${productoPedido}"`);

    //var documentosEnBson = await modeloConsumos.find({producto: productoPedido } ) //guardo todos los documentos que coinciden con
    // el producto del pedido (mongoDB los devuelve en formato BSON)
    // estos documentos son los insumos que consume el producto pedido.

    const dataString = JSON.stringify(documentosEnBson); //convierto de BSON a cadena de texto JSON 

    const insumosYConsumosDelProducto = JSON.parse(dataString); //convierto a objeto JSON


    for (let i=0; i < insumosYConsumosDelProducto.length ; i++){  //recorro cada uno de los insumos involucrados en el producto
    //// Por cada insumo involucrado en el producto pedido, se itera este bucle.

        var insumoABuscar = insumosYConsumosDelProducto[i].insumo 

        var documentosEnBson2 = await ejecutar(`SELECT * FROM insumos WHERE nombre LIKE "${insumoABuscar}"`);

        //var documentosEnBson2 = await modeloInsumos.find({nombre: insumoABuscar } )

        const dataString2 = JSON.stringify(documentosEnBson2); //convierto de BSON a cadena de texto JSON 

        const insumo = JSON.parse(dataString2); //convierto a objeto JSON

        var cantidadStockInsumo = insumo[0].cantidad  // cantidad de insumo en stock

        var insumoConsumido = insumosYConsumosDelProducto[i].consumoPorTachada * tachadasNumber //insumo consumido

        var cantidadInsumoRestante = cantidadStockInsumo - insumoConsumido  // resto la cantidad de insumo consumido


        // actualizo la cantidad de insumos en stock

        await ejecutar(`UPDATE insumos SET cantidad = "${cantidadInsumoRestante}" WHERE nombre = "${insumoABuscar}" `);

        
        //await modeloInsumos.update({nombre: insumoABuscar}, { cantidad: cantidadInsumoRestante });
        // 1er argumento: localizo el documento de la tabla insumos cuyo nombre sea el del insumo en cuestion,
        // 2do arg : actualizo el contenido de su campo 'cantidad' con el nuevo valor 'cantidadInsumoRestante'



        if ( cantidadInsumoRestante < insumo[0].limite ){  //si la nueva cantidad de insumos es menor a la cantidad limite

            if ( cantidadInsumoRestante < 0 ){  //si no queda mas insumo

                info.push('NO HAY MAS ' + (insumo[0].nombre).toUpperCase() + ' !' )
                //almaceno en el array 'info' un texto informando el faltante del insumo 

            }else{

                info.push('SOLO QUEDAN ' + cantidadInsumoRestante.toString() + ' ' + (insumo[0].unidad).toUpperCase() + ' DE ' +  (insumo[0].nombre).toUpperCase() + ' !' )
                //almaceno en el array el insumo en escaces con la cantidad en stock

            }

        }

       

    }

    //// Devuelvo informacion de los insumos

    return info



} 

/* actualizarInsumoPorPedido =  async (cantidad, producto) => {  //logica para actualizar los insumos, segun los pedidos realizados,
    // y el gasto de insumo de cada producto del pedido.
    //// Por cada fila de la tabla de pedidos realizados, se ingresa a esta funcion

    var tachadasPedidas = cantidad.substring(0, cantidad.length - 2); ; // tachadas de producto

    var productoPedido = producto.substring(0, producto.length - 2);  //producto pedido.
    //los string provenientes del frontend vienen con el salto de linea '/n' al final, y debo eliminar estos 2 caracteres con substring(),
    // para que mongoose pueda encontrar mis documentos.


    var tachadasNumber // tachadas pedidas expresadas en numeros

    if (tachadasPedidas == '1 cargada') { tachadasNumber = 3 }
    if (tachadasPedidas == '1/2 cargada') { tachadasNumber = 1.5 }    
    if (tachadasPedidas == '1 tachada') { tachadasNumber = 1 }

    var info = []// aca guardare la informacion de los insumos faltantes o en escaces
    
    var documentosEnBson = await modeloConsumos.find({producto: productoPedido } ) //guardo todos los documentos que coinciden con
    // el producto del pedido (mongoDB los devuelve en formato BSON)
    // estos documentos son los insumos que consume el producto pedido.

    const dataString = JSON.stringify(documentosEnBson); //convierto de BSON a cadena de texto JSON 

    const insumosYConsumosDelProducto = JSON.parse(dataString); //convierto a objeto JSON


    for (let i=0; i < insumosYConsumosDelProducto.length ; i++){  //recorro cada uno de los insumos involucrados en el producto
    //// Por cada insumo involucrado en el producto pedido, se itera este bucle.

        var insumoABuscar = insumosYConsumosDelProducto[i].insumo 

        var documentosEnBson2 = await modeloInsumos.find({nombre: insumoABuscar } )

        const dataString2 = JSON.stringify(documentosEnBson2); //convierto de BSON a cadena de texto JSON 

        const insumo = JSON.parse(dataString2); //convierto a objeto JSON

        var cantidadStockInsumo = insumo[0].cantidad  // cantidad de insumo en stock

        var insumoConsumido = insumosYConsumosDelProducto[i].consumoPorTachada * tachadasNumber //insumo consumido

        var cantidadInsumoRestante = cantidadStockInsumo - insumoConsumido  // resto la cantidad de insumo consumido


        // actualizo la cantidad de insumos en stock
        await modeloInsumos.update({nombre: insumoABuscar}, { cantidad: cantidadInsumoRestante });
        // 1er argumento: localizo el documento de la tabla insumos cuyo nombre sea el del insumo en cuestion,
        // 2do arg : actualizo el contenido de su campo 'cantidad' con el nuevo valor 'cantidadInsumoRestante'



        if ( cantidadInsumoRestante < insumo[0].limite ){  //si la nueva cantidad de insumos es menor a la cantidad limite

            if ( cantidadInsumoRestante < 0 ){  //si no queda mas insumo

                info.push('NO HAY MAS ' + (insumo[0].nombre).toUpperCase() + ' !' )
                //almaceno en el array 'info' un texto informando el faltante del insumo 

            }else{

                info.push('SOLO QUEDAN ' + cantidadInsumoRestante.toString() + ' ' + (insumo[0].unidad).toUpperCase() + ' DE ' +  (insumo[0].nombre).toUpperCase() + ' !' )
                //almaceno en el array el insumo en escaces con la cantidad en stock

            }

        }

       

    }

    //// Devuelvo informacion de los insumos

    return info



} */


// para ejecuciones asincronas de consultas sql a sqlite

async function ejecutar(query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}



module.exports = pedidosCtrl ; 