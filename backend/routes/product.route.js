import express from "express";
import { getProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get('/get', getProduct)


export default router;