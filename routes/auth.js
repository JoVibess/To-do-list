const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// --- REGISTER ---
router.get("/register", (req, res) => {
  res.status(200).render("register", { errors: null, values: {} });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).render("register", {
        errors: ["Cet e-mail est déjà utilisé"],
        values: req.body,
      });
    }

    await User.create({ email, password });
    return res.status(201).redirect("/login");
  } catch (err) {
    console.error(err);
    const messages =
      err.name === "SequelizeValidationError"
        ? err.errors.map((e) => e.message)
        : ["Erreur serveur"];
    res.status(400).render("register", { errors: messages, values: req.body });
  }
});

// --- LOGIN ---
router.get("/login", (req, res) => {
  res.status(200).render("login", { errors: null, values: {} });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const user = await User.findOne({ where: { email } });
    const valid = user && (await user.validPassword(password));

    if (!valid) {
      return res.status(401).render("login", {
        errors: ["Identifiants invalides"],
        values: req.body,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,  
      secure: false,  
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("login", {
      errors: ["Erreur serveur"],
      values: req.body,
    });
  }
});

// --- LOGOUT ---
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
