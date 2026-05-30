const path = require('path');
console.log('cwd', process.cwd());
console.log('authRoutes path', path.resolve('./routes/authRoutes.js'));
console.log('workerRoutes path', path.resolve('./routes/workerRoutes.js'));
try {
  const authRoutes = require('./routes/authRoutes');
  console.log('authRoutes type', typeof authRoutes);
  console.log('authRoutes object keys', Object.keys(authRoutes));
  console.log('authRoutes is router?', authRoutes && typeof authRoutes === 'function' ? 'yes' : 'no');
} catch (err) {
  console.error('authRoutes require failed:', err);
}
try {
  const workerRoutes = require('./routes/workerRoutes');
  console.log('workerRoutes type', typeof workerRoutes);
  console.log('workerRoutes object keys', Object.keys(workerRoutes));
  console.log('workerRoutes is router?', workerRoutes && typeof workerRoutes === 'function' ? 'yes' : 'no');
} catch (err) {
  console.error('workerRoutes require failed:', err);
}
try {
  const controller = require('./controllers/authController');
  console.log('authController keys', Object.keys(controller));
} catch (err) {
  console.error('authController require failed:', err);
}
