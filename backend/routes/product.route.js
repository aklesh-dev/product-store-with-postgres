import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get('/', getProducts); // *get all products
router.get('/:id', getProduct); // *get a single product by id
router.post('/create', createProduct); // *create a new product
router.put('/:id', updateProduct); // *update a product by id
router.delete('/:id', deleteProduct); // *delete a product by id


export default router;