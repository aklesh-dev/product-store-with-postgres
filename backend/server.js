import express from "express";
import "dotenv/config"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import productRoutes from "./routes/product.route.js"
import { sql } from "./database/db.config.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ?Middlewares
app.use(express.json());
app.use(cors());
//* helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());
// *log the request
app.use(morgan("dev"));

// ?Routes
app.use('/api/products', productRoutes);

// ?Database initialize
async function initDB() {
  //// const sql = `YOUR SQL STATEMENT HERE`;
  //// console.log(sql);
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('Database initalized successfully');
  } catch (error) {
    console.error("Error initDB:", error.message);
  }
};

// *Initialize the database and start the server if successful
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch((e) => {
  console.error("Error:", e);
})
