const path = require('path');
const p = path.resolve('./routes/bookingRoutes.js');
console.log('resolved', p);
try {
  const m = require(p);
  console.log('first require typeof', typeof m, Object.keys(m || {}));
} catch (e) {
  console.error('first require error', e);
}
console.log('cache keys snippet:');
Object.keys(require.cache).forEach(k=>{ if (k.includes('booking')) console.log(k); });
const mod = require.cache[p];
console.log('cache entry:', !!mod);
if (mod) {
  console.log('module.exports keys', Object.keys(mod.exports || {}));
  console.log('loaded', mod.loaded);
  console.log('children count', mod.children.length);
  console.log('parents:', mod.parent && mod.parent.filename);
}
