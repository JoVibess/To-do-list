const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const fileLogger = require('../middlewares/logger');

const JWT_PRIVATE_TOKEN = process.env.JWT_PRIVATE_TOKEN || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

router.use(fileLogger);

// VUES
router.get('/login', (req, res) => {
  res.status(200).render('login', { errors: null, values: {} });
});
router.get('/register', (req, res) => {
  res.status(200).render('register', { errors: null, values: {} });
});

// REGISTER (JSON + option redirection si tu fais un form HTML)
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) {
      return res.status(400).render('register', { errors: ['Email et mot de passe requis'], values: req.body });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).render('register', { errors: ['Utilisateur déjà existant'], values: req.body });
    }

    await User.create({ email, password, role: role || 'client' });

    // Si HTML, redirige vers le login
    if (req.accepts('html')) return res.redirect('/auth/login');
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error('Erreur /register:', e);
    return res.status(500).render('register', { errors: ['Erreur interne du serveur'], values: req.body });
  }
});

// LOGIN 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).render('login', { errors: ['Email et mot de passe requis'], values: req.body });
    }

    const user = await User.findOne({ where: { email } });
    const ok = user && await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).render('login', { errors: ['Identifiants invalides'], values: req.body });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_PRIVATE_TOKEN, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
    });

    if (req.accepts('html')) return res.redirect('/');
    return res.json({ token });
  } catch (e) {
    console.error('Erreur /login:', e);
    return res.status(500).render('login', { errors: ['Erreur interne du serveur'], values: req.body });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  if (req.accepts('html')) return res.redirect('/auth/login');
  return res.status(204).end();
});

module.exports = router;
