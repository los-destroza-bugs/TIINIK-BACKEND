'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Requester } = require('cote');

const requester = new Requester({ name: 'TIINIK' });

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

usuarioSchema.methods.enviarEmail = async function(asunto, cuerpo) {

  const evento = {
    type: 'enviar-email',

    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo
  }

  return new Promise(resolve => requester.send(evento, resolve));

}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;