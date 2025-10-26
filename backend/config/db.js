import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" }); // ✅ important path
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
console.log("Loaded env variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ found" : "❌ missing");
console.log("DB_NAME:", process.env.DB_NAME);
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// db.connect(err => {
//   if (err) console.log("❌ Database connection failed:", err);
//   else console.log("✅ Connected to MySQL");
// });

// export default db;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,  // removed hard-coded value
  database: process.env.DB_NAME || "beqaago",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const connection = await pool.getConnection();
  console.log("✅ Connected to MySQL via connection pool");
  connection.release();
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

export default pool;

