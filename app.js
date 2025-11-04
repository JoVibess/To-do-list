const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// Middlewares & Routes
const requestLogger = require('./middlewares/logger');
const jwtAuth = require('./middlewares/jwtAuth');
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');

const app = express();

// Sécurité basique
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant dans .env');
}

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Core middlewares
app.use(logger('dev'));
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes publiques (register / login / logout)
app.use('/', authRoutes);

// Routes protégées par JWT
app.use('/', jwtAuth, pagesRoutes);

// 404
app.use((req, res, next) => next(createError(404)));

// Gestion erreurs
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
