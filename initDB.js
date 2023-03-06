'use strict';

const readline = require ('readline');

// conectamos a la base de datos
const connection = require('./lib/connectMongoose');

//cargar los modelos
const { Usuario } = require('./models');

async function main () {

    const continuar = await pregunta('Esta seguro que desea BORRAR COMPLETAMENTE la base de datos y cargar los datos por defecto?');
    if (!continuar) {
        process.exit();
    }

    // inicializamos la colección de usuarios
    await initUsuarios();

    connection.close();
}

main().catch(err => console.log('error de tipo: ', err, ' al realizar la inicialización'));

async function initUsuarios() {
    // borrar todos los documentos de usuario
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} usuarios.`);
  
    // crear usuarios iniciales
    const inserted = await Usuario.insertMany([
      { email: 'admin@example.com', password: await Usuario.hashPassword('1234') },
      { email: 'user1@example.com', password: await Usuario.hashPassword('1234') },
    ]);
    console.log(`Creados ${inserted.length} usuarios.`);
  }



function pregunta(texto) {
    return new Promise((resolve, reject) => {
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        ifc.question(texto, respuesta => {
            ifc.close();
            if (respuesta.toLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        })
    });
}