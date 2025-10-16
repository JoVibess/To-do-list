/**
 * Helpers de parsing des filtres/tri pour Sequelize.
 * On injecte Op et Label pour éviter les dépendances directes.
 */

/**
 * Construit l'objet "where" Sequelize depuis req.query
 * @param {object} qs - req.query
 * @param {object} Op - Sequelize.Op (injecté)
 * @returns {object} where
 */
function buildWhereFromQuery(qs, Op) {
    const where = {};
    const or = [];
  
    // done filter
    if (qs.done !== undefined && qs.done !== '') {
      where.done = ['1', 'true', 1, true].includes(qs.done) ? 1 : 0;
    }
  
    // labelId filter
    if (qs.labelId) where.labelId = Number(qs.labelId);
  
    // recherche globale q : id | titre | description | date (YYYY-MM-DD)
    if (qs.q && String(qs.q).trim()) {
      const q = String(qs.q).trim();
  
      // id exact si nombre
      const asInt = Number.parseInt(q, 10);
      if (Number.isFinite(asInt) && String(asInt) === q) {
        or.push({ id: asInt });
      }
  
      // titre / description LIKE
      or.push({ titre: { [Op.like]: `%${q}%` } });
      or.push({ description: { [Op.like]: `%${q}%` } });
  
      // date stricte (préfixe YYYY-MM-DD)
      or.push({ datetime: { [Op.between]: [`${q} 00:00:00`, `${q} 23:59:59`] } });
    }
  
    if (or.length) where[Op.or] = or;
  
    return where;
  }
  
  /**
   * Construit la clause "order" Sequelize depuis req.query
   * @param {object} qs - req.query
   * @param {any} LabelModel - le modèle Label (injecté), pour trier par label
   * @returns {Array} order
   */
  function buildOrderFromQuery(qs, LabelModel) {
    // orderBy: id|datetime|titre|done|label ; order: asc|desc
    const orderBy = ['id', 'datetime', 'titre', 'done', 'label'].includes(qs.orderBy)
      ? qs.orderBy
      : 'id';
    const order = String(qs.order).toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  
    if (orderBy === 'label') {
      // tri par nom de label puis tie-breaker id desc
      return [[{ model: LabelModel, as: 'Label' }, 'name', order], ['id', 'DESC']];
    }
    // tri simple + tie-breaker id desc pour stabilité
    return [[orderBy, order], ['id', 'DESC']];
  }
  
  module.exports = {
    buildWhereFromQuery,
    buildOrderFromQuery,
  };
  