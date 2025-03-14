import express from "express";
import "dotenv/config"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import productRoutes from "./routes/product.route.js"

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
app.use('/api/product', productRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});