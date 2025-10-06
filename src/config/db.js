import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,        // beqaago
    process.env.DB_USER,        // root
    process.env.DB_PASSWORD,    // your password
    {
        host: process.env.DB_HOST, // localhost
        dialect: "mysql",
        logging: false,            // hides raw SQL logs (optional)
    }
);

// Test connection
try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL Database via Sequelize!");
} catch (error) {
    console.error("❌ Unable to connect to the database:", error);
}

export default sequelize;
