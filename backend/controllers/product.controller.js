export const getProduct = async (req, res) => {
  try {
    res.send("Hello")
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}