import express from "express";
import "dotenv/config"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/product.route.js"
import { sql } from "./database/db.config.js";
import { aj } from "./lib/arcjet.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(); //* to resolve the path of the current directory which is (root directory of the project)

// ?Middlewares
app.use(express.json());
app.use(cors());
//* helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet({
  contentSecurityPolicy:false, //* disable content security policy to allow images to be loaded from other domains
}));
// *log the request
app.use(morgan("dev"));

// ?Apply arcjet rate limiter to all routes
app.use( async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,  // specifices that each request consume 1 token
    });

    if (decision.isDenied()) {
      if(decision.reason.isRateLimit()){
        res.status(429).json({ message: "Too many requests, please try again later" });
      }
      else if(decision.reason.isBot()){
        res.status(403).json({ message: "Forbidden, bot detected" });
      }
      else{
        res.status(403).json({ message: "Forbidden"})
      }
      return;
    }

    // Check for spoofed bots
    if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      return res.status(403).json({ message: "Forbidden, spoofed bot detected" });
    }
    
    next();
    
  } catch (error) {
    console.error("Error in arcjet middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
    next(error.message);
  }
})


// ?Routes
app.use('/api/products', productRoutes);

// *Serve react app
if(process.env.NODE_ENV === "production"){
  // *Serving static files in production
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // *Handling all routes that doesn't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

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
