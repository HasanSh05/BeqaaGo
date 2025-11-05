import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,            // keep local simple
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const conn = await db.getConnection();
  console.log("✅ Connected to MySQL (SHA2)");
  conn.release();
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

export default db;
