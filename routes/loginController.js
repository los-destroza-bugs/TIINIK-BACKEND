'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require("dotenv").config();

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = res.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      req.session.usuarioLogado = usuario._id;

      usuario.enviarEmail('Bienvenido', 'Bienvenido a TIINIK BackEnd');

      res.redirect('/index');
    } catch(err) {
      next(err);
    }
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.status(401).json({ error: 'Invalid credentials' })
        return;
      }

      const token = jwt.sign({ _id: usuario._id }, process.env.JWT_KEYS, {
        expiresIn: '2d'
      });

      res.json({ token })
    } catch(err) {
      next(err);
    }
  }


  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }

}

module.exports = LoginController;