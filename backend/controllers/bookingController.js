const db = require("../config/db");

// ===============================
// CREATE BOOKING
// ===============================
const createBooking = (req, res) => {

    const { user_id, worker_id, booking_date, address, price } = req.body;

    const query = `
        INSERT INTO bookings 
        (user_id, worker_id, booking_date, status, address, price, created_at)
        VALUES (?, ?, ?, 'pending', ?, ?, NOW())
    `;

    db.query(
        query,
        [user_id, worker_id, booking_date, address, price],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error creating booking",
                    error: err
                });
            }

            res.status(201).json({
                message: "Booking created successfully",
                bookingId: result.insertId
            });
        }
    );
};


// ===============================
// GET BOOKINGS BY USER
// ===============================
const getUserBookings = (req, res) => {

    const { user_id } = req.params;

    const query = `
        SELECT 
            b.id,
            b.booking_date,
            b.status,
            b.address,
            b.price,
            b.created_at,
            w.service_type,
            u.full_name AS worker_name,
            u.phone AS worker_phone
        FROM bookings b
        JOIN workers w ON b.worker_id = w.id
        JOIN users u ON w.user_id = u.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    `;

    db.query(query, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching bookings",
                error: err
            });
        }

        res.json(result);
    });
};


// ===============================
// UPDATE BOOKING STATUS
// ===============================
const updateStatus = (req, res) => {

    const { booking_id, status } = req.body;

    const allowedStatus = ["pending", "accepted", "completed", "cancelled"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Invalid status value"
        });
    }

    const query = `
        UPDATE bookings
        SET status = ?
        WHERE id = ?
    `;

    db.query(query, [status, booking_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating booking",
                error: err
            });
        }

        res.json({
            message: "Booking status updated successfully"
        });
    });
};


// ===============================
// EXPORTS
// ===============================
module.exports = {
    createBooking,
    getUserBookings,
    updateStatus
};
