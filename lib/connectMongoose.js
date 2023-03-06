const mongoose = require('mongoose');
require ('dotenv').config();

const { MONGO_URI } = process.env;
const { API_PORT } = process.env;
var port = process.env.API_PORT || API_PORT;

mongoose.connection.on('error', err => {
    console.log('errore de conexión', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('** Conectado a MongoDB en', mongoose.connection.name, '       **');
    console.log(`** Server running in http://localhost:${port} **`);
    console.log(`**                                         **`);
    console.log(`*********************************************`);
});

mongoose.connect(MONGO_URI);

module.exports = mongoose.connection;
