const db = require("../config/db");

// Add Worker Profile
const addWorker = (req, res) => {

    const { user_id, service_type, experience, availability } = req.body;

    const query = `
        INSERT INTO workers (user_id, service_type, experience, availability)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [user_id, service_type, experience, availability], (err, result) => {

        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: "Worker profile created successfully"
        });
    });
};

// Get All Workers
const getWorkers = (req, res) => {

    const query = `
        SELECT w.*, u.full_name, u.phone, u.email
        FROM workers w
        JOIN users u ON w.user_id = u.id
    `;

    db.query(query, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

module.exports = {
    addWorker,
    getWorkers
};
