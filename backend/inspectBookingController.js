const bc = require('./controllers/bookingController');
console.log('bookingController type', typeof bc);
console.log('bookingController keys', Object.keys(bc || {}));
console.log('createBooking type', typeof bc.createBooking);
console.log('getUserBookings type', typeof bc.getUserBookings);
console.log('updateStatus type', typeof bc.updateStatus);
