const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (typeof authRoutes !== "function") {
    throw new TypeError("authRoutes must export an Express router function");
}

if (typeof workerRoutes !== "function") {
    throw new TypeError("workerRoutes must export an Express router function");
}

if (typeof bookingRoutes !== "function") {
    throw new TypeError("bookingRoutes must export an Express router function");
}

app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.send("Household Helper API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
