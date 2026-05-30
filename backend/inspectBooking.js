const br = require('./routes/bookingRoutes');
console.log('bookingRoutes typeof', typeof br);
console.log('bookingRoutes keys', Object.keys(br || {}));
console.log('is function?', br && typeof br === 'function');
