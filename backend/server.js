import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import app from "./app.js";

const PORT = process.env.PORT || 5550;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
