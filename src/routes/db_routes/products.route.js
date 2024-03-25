const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/db_services/products.service");
const productsService = new ProductsService();

// GET /api/products
//localhost:8080/api/products/
//localhost:8080/api/products?limit=5&page=1
//localhost:8080/api/products?limit=5&page=1&sort=dec
//localhost:8080/api/products?limit=5&page=1&query=Product 2
//localhost:8080/api/products?category=Category%20A
//localhost:8080/api/products?status=true
router.get("/", async (req, res) => {
  try {
    const products = await productsService.getAllProducts(req.query);
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
    }
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await productsService.addProduct(newProduct);
    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productsService.updateProductById(
      pid,
      updatedProductData
    );
    res.status(201).send({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productsService.deleteProductById(pid);
    res.status(205).send({ status: "success", payload: null });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

module.exports = router;
