const express = require("express");
const router = express.Router();
const ProductsService = require("../services/db_services/products.service");
const productsService = new ProductsService();
const CartsService = require("../services/db_services/carts.service");
const cartsService = new CartsService();

// GET /products
router.get("/products", async (req, res) => {
  try {
    const cart = await cartsService.getOrCreateCart(); //Obtiene o crea un carrito
    const result = await productsService.getAllProducts(req.query);
    result.cartId = cart._id; //Agrega el id del carrito al resultado para usarlo al agregar productos
    result.prevLink = result.hasPrevPage
      ? `http://localhost:8080/products?page=${result.prevPage}`
      : "";
    result.nextLink = result.hasNextPage
      ? `http://localhost:8080/products?page=${result.nextPage}`
      : "";
    result.isValid = !(
      req.query.page < 1 || req.query.page > result.totalPages
    );
    res.render("products", result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
});

// GET /cart
router.get("/cart", async (req, res) => {
  try {
    // Busca el primer carrito disponible o crea uno nuevo si no hay ninguno.
    const cartId = await cartsService.getOrCreateCart();
    const cid = cartId._id.toString();
    console.log("🚀 ~ router.get ~ cid:", cid)
    // Usa el método getCartById para obtener el carrito con todos sus productos.
    const cart = await cartsService.getCartById(cid);
    cart.cartId = cid; // Agrega el id del carrito al resultado para usarlo en CRUD  
    res.render("cart", cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el carrito");
  }
});

// POST /cart/:cid/add/:pid (agregar producto al carrito)
router.post("/cart/:cid/add/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;    
    const { quantity } = req.body;
    await cartsService.addProductsToCart(cid, pid, quantity);
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
});

router.post('/cart/:cid/update/:pid', async (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsService.getOrCreateCart();
    const cartId = cart._id.toString();
    await cartsService.updateProductQuantity(cartId, pid, quantity);
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la cantidad de producto');
  }
});

router.post('/cart/:cid/remove/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const cart = await cartsService.getOrCreateCart();
    const cartId = cart._id.toString();
    await cartsService.removeProductFromCart(cartId, pid);
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el producto del carrito');
  }
});
module.exports = router;
