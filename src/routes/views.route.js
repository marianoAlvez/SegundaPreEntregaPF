const express = require("express");
const router = express.Router();
const ProductsService = require('../services/db_services/products.service');
const productsService = new ProductsService();
const CartsService = require('../services/db_services/carts.service');
const cartsService = new CartsService();

// GET /products
router.get("/products", async (req, res) => {
  try {
    const result = await productsService.getAllProducts(req.query);
    result.prevLink = result.hasPrevPage
      ? `http://localhost:8080/products?page=${result.prevPage}`
      : "";
    result.nextLink = result.hasNextPage
      ? `http://localhost:8080/products?page=${result.nextPage}`
      : "";
    result.isValid = !(req.query.page < 1 || req.query.page > result.totalPages);
    console.log('result: ', result);
    res.render("products", result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
});

// GET /cart/:cid
router.get("/cart/:cid", async (req, res) => {
  let cid = req.params.cid;
  try {
    const cart = await cartsService.getCartById(cid);
    console.log(cart);
    res.render("cart", cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el carrito');
  }
});

module.exports = router;
