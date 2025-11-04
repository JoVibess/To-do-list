// utils/helpers.js
const { Op } = require('sequelize');

function to01(v) {
  return ['1', 1, true, 'true', 'on', 'yes'].includes(v) ? 1 : 0;
}

/**
 * Construit le WHERE Sequelize à partir de la querystring
 */
function buildWhereFromQuery(qs = {}) {
  const where = {};
  const or = [];

  // filtre done (0|1)
  if (qs.done !== undefined && qs.done !== '') {
    where.done = to01(qs.done);
  }

  // filtre labelId
  if (qs.labelId) {
    const lid = Number.parseInt(qs.labelId, 10);
    if (Number.isFinite(lid)) where.labelId = lid;
  }

  // recherche globale
  const q = (qs.q || '').trim();
  if (q) {
    // id exact
    const asInt = Number.parseInt(q, 10);
    if (Number.isFinite(asInt) && String(asInt) === q) {
      or.push({ id: asInt });
    }
    // titre / description (LIKE)
    or.push({ titre: { [Op.like]: `%${q}%` } });
    or.push({ description: { [Op.like]: `%${q}%` } });

    // date au format YYYY-MM-DD (intervalle sur la journée)
    if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
      or.push({
        datetime: {
          [Op.between]: [new Date(`${q}T00:00:00`), new Date(`${q}T23:59:59`)],
        },
      });
    }
  }

  if (or.length) where[Op.or] = or;
  return where;
}

/**
 * Construit le ORDER Sequelize
 * - 'label' => tri sur Label.name (puis id pour tie-breaker)
 */
function buildOrderFromQuery(qs = {}) {
  const allowed = new Set(['id', 'datetime', 'titre', 'done', 'label']);
  let orderBy = String(qs.orderBy || 'id').toLowerCase();
  if (!allowed.has(orderBy)) orderBy = 'id';

  const order = String(qs.order || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  if (orderBy === 'label') {
    // fonctionne car tu inclues { model: Label } sans alias ⇒ alias 'Label'
    return [['Label', 'name', order], ['id', 'DESC']];
  }
  return [[orderBy, order], ['id', 'DESC']];
}

module.exports = {
  buildWhereFromQuery,
  buildOrderFromQuery,
};
