const to01 = (v) => (v == 1 || v === '1' || v === true || v === 'true' ? 1 : 0);

const toSqlDatetime = (v) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const intSafe = (v, def) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : def;
};

const normalizeLimitOffset = (limit, offset, max = 100) => {
  const limitNum  = Math.min(Math.max(intSafe(limit, 100), 1), max);
  const offsetNum = Math.max(intSafe(offset, 0), 0);
  return { limitNum, offsetNum };
};

module.exports = { to01, toSqlDatetime, intSafe, normalizeLimitOffset };
