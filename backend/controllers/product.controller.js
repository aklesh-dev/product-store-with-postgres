import { sql } from "../database/db.config.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY createdAt DESC`;
    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  // validate input
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  try {
    const newProduct = await sql`INSERT INTO products (name, price, image) VALUES (${name}, ${price}, ${image}) RETURNING *`;
    // check if product was created
    if (!newProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not created",
      });
    }
    return res.status(201).json({
      success: true,
      data: newProduct[0], // return the newly created product
    });

  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;
    // check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product[0], // return the product
    });

  } catch (error) {
    console.error("Error fetching single product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  // validate input
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  try {
    const updatedProduct = await sql`UPDATE products SET name = ${name}, price = ${price}, image = ${image} WHERE id = ${id} RETURNING *`;
    // check if product exists
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct[0], // return the updated product
    });

  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;
    // check if product exists
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct[0], // return the deleted product
    });

  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};