const express = require("express");
const router = express.Router();

const {
    createBooking,
    getUserBookings,
    updateStatus
} = require("../controllers/bookingController");

// ===============================
// CREATE BOOKING
// ===============================
router.post("/create", createBooking);

// ===============================
// GET USER BOOKINGS
// ===============================
router.get("/user/:user_id", getUserBookings);

// ===============================
// UPDATE BOOKING STATUS
// ===============================
router.put("/status", updateStatus);

// ===============================
// EXPORT ROUTER
// ===============================
module.exports = router;
