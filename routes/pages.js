const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Task, Label } = require("../models/Index");
const { toSqlDatetime } = require("../utils/utils");
const {
  buildWhereFromQuery,
  buildOrderFromQuery,
} = require("../utils/helpers");

//---------------------------------------------------
// Page d’accueil /
//---------------------------------------------------
router.use((req, res, next) => {
  if (!req.user) return res.redirect('/auth/login');
  next();
});

router.get('/', async (req, res) => {
  const { q = '', orderBy = 'id', order = 'desc', labelId = '', done = '' } = req.query;

  const where = { ...buildWhereFromQuery(req.query), userId: req.user.id };
  const orderArr = buildOrderFromQuery(req.query);
  const include = [{ model: Label, attributes: ['id', 'name', 'color'] }];

  const tasksAll = await Task.findAll({ where, include, order: orderArr });
  const tasksTodo = tasksAll.filter(t => Number(t.done) === 0);
  const tasksDone = tasksAll.filter(t => Number(t.done) === 1);
  const labels = await Label.findAll({ order: [['name', 'ASC']] });

  res.render('home', { q, orderBy, order, labelId, done, labels, tasksTodo, tasksDone });
});

//---------------------------------------------------
// /new (formulaire d’ajout)
//---------------------------------------------------
router.get("/new", async (_req, res) => {
  const labels = await Label.findAll({ order: [["name", "ASC"]] });
  res.render("form_new", { errors: null, values: {}, labels });
});

router.post("/new", async (req, res) => {
  try {
    const { titre, description, datetime, labelId } = req.body || {};
    const dt = toSqlDatetime(datetime);
    const labels = await Label.findAll({ order: [["name", "ASC"]] });

    if (!titre || !String(titre).trim()) {
      return res.status(400).render("form_new", {
        errors: ["Le titre est requis"],
        values: req.body,
        labels,
      });
    }

    if (!dt) {
      return res.status(400).render("form_new", {
        errors: ["La date/heure est requise"],
        values: req.body,
        labels,
      });
    }

    await Task.create({
      titre: titre.trim(),
      description: description ?? null,
      datetime: dt,
      done: 0,
      labelId: labelId ? Number(labelId) : null,
      userId: req.user.id,
    });

    res.redirect("/");
  } catch (e) {
    console.error(e);
    const labels = await Label.findAll({ order: [["name", "ASC"]] });
    res.status(500).render("form_new", {
      errors: ["Erreur serveur"],
      values: req.body,
      labels,
    });
  }
});

//---------------------------------------------------
// /delete/:id
//---------------------------------------------------
router.get("/delete/:id", async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [{ model: Label, attributes: ["id", "name", "color"] }],
  });

  if (!task) return res.status(404).send("Tâche introuvable");
  res.render("delete_task", { task });
});

router.post("/delete/:id", async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.redirect("/");
});

//---------------------------------------------------
// /update/:id
//---------------------------------------------------
router.get("/update/:id", async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) return res.status(404).send("Tâche introuvable");

  const labels = await Label.findAll({ order: [["name", "ASC"]] });

  res.render("form_update", {
    errors: null,
    values: {
      id: task.id,
      titre: task.titre,
      description: task.description ?? "",
      datetime: new Date(task.datetime).toISOString().slice(0, 16),
      done: task.done,
      labelId: task.labelId || "",
    },
    labels,
  });
});

router.post("/update/:id", async (req, res) => {
  const { titre, description, datetime, done, labelId } = req.body || {};
  const dt = toSqlDatetime(datetime);
  const labels = await Label.findAll({ order: [["name", "ASC"]] });

  if (!titre || !String(titre).trim()) {
    return res.status(400).render("form_update", {
      errors: ["Le titre est requis"],
      values: { ...req.body, id: req.params.id },
      labels,
    });
  }

  if (!dt) {
    return res.status(400).render("form_update", {
      errors: ["La date/heure est requise"],
      values: { ...req.body, id: req.params.id },
      labels,
    });
  }

  await Task.update(
    {
      titre: titre.trim(),
      description: description ?? null,
      datetime: dt,
      done: ["1", "true", 1, true, "on"].includes(done) ? 1 : 0,
      labelId: labelId ? Number(labelId) : null,
    },
    { where: { id: req.params.id, userId: req.user.id } }
  );

  res.redirect("/");
});

module.exports = router;
