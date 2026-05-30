const p = require.resolve('./controllers/bookingController.js');
console.log('resolved', p);
if (require.cache[p]) delete require.cache[p];
const c = require('./controllers/bookingController.js');
console.log('keys', Object.keys(c));
console.log('createBooking', typeof c.createBooking);
