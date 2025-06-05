
//--------------------------------------------------
import {MongoClient, ObjectId} from "mongodb";

function conectar(){
    return MongoClient.connect(process.env.URL);
}

export function leerColores(){
    return new Promise((ok,ko) => {

        let conexion = null;

        conectar()
        .then(conexionPromesa => {

            conexion = conexionPromesa;

            let coleccion = conexion.db("colores").collection("colores")

            return coleccion.find({}).toArray()
        })
        .then(colores => {
                conexion.close();
                ok(colores.map( ({_id,r,g,b}) => {
                    let id = _id;

                    return {id,r,g,b}
                }));
        })
        .catch( error => ko({ error : "error en la base de datos"}))
    });     
}

export function crearColor({r,g,b}){
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionPromesa => {

            conexion = conexionPromesa;

            let coleccion = conexion.db("colores").collection("colores")

            return coleccion.insertOne({r,g,b})
        })
        .then(resultado => {
            conexion.close();
            ok(resultado.insertedId);
        })
        .catch( error => ko({ error : "error en la base de datos"}))
    });
}


export function borrarColor(id){
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionPromesa => {

            conexion = conexionPromesa;

            let coleccion = conexion.db("colores").collection("colores")

            return coleccion.deleteOne({ _id : new ObjectId(id) })
        })
        .then(resultado => {
            conexion.close();
            ok(resultado.deletedCount);
        })
        .catch( error => ko({ error : "error en la base de datos"}))
    });
}

//pruebas
/*
crearColor({r: 0, g: 100, b: 0})
.then(id => console.log(id))
.catch(x => console.log(x));
*/

/*
borrarColor('684173e2b64b9839f24db51d')
.then(x => console.log(x))
.catch(x => console.log(x));
*/

/*
leerColores()
.then(x => console.log(x))
.catch(x => console.log(x));
*/
