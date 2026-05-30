const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is required" });
    }

    const { full_name, email, password, phone, role } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ message: "full_name, email, and password are required" });
    }

    try {
        const checkQuery = "SELECT * FROM users WHERE email = ?";

        db.query(checkQuery, [email], async (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = "INSERT INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)";

            db.query(
                insertQuery,
                [full_name, email, hashedPassword, phone, role || "user"],
                (err, result) => {
                    if (err) return res.status(500).json(err);

                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const loginUser = (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};
