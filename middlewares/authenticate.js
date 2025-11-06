const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_PRIVATE_TOKEN = process.env.JWT_PRIVATE_TOKEN || 'default_secret';

module.exports = async function authenticate(req, res, next) {
  try {
    let token = null;
    const h = req.headers.authorization || '';
    if (h.startsWith('Bearer ')) token = h.slice(7).trim();
    if (!token && req.cookies?.token) token = req.cookies.token;

    if (!token) return res.redirect('/auth/login');

    const payload = jwt.verify(token, JWT_PRIVATE_TOKEN);
    const user = await User.findByPk(payload.userId || payload.id);
    if (!user) return res.redirect('/auth/login');

    req.user = { id: user.id, email: user.email, role: user.role };
    res.locals.user = req.user; // utile dans Pug (topbar, etc.)
    next();
  } catch {
    return res.redirect('/auth/login');
  }
};
