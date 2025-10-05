import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static("public"));

// Basic route for testing
app.get("/", (req, res) => {
    res.send("BeqaaGo backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
