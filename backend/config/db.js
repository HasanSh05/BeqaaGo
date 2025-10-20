import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" }); // ✅ important path

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

db.connect(err => {
  if (err) console.log("❌ Database connection failed:", err);
  else console.log("✅ Connected to MySQL");
});

export default db;
