const express = require('express');
const router = express.Router();
const CartsService = require('../../services/db_services/carts.service');
const cartsService = new CartsService();

// GET /api/carts/:cid
//Busca un carrito por su id y trae todos los productos que tiene con Populate
router.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartsService.getCartById(cid);
        res.send({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message});
    }
});

// POST /api/carts este endpoint crea un carrito vacio
router.post("/", async (req, res) => {
    try {
        const newCart = await cartsService.createCart();
        res.status(201).send({ status: "success", payload: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

// POST /api/carts/:cid/product/:pid Este endpoint agrega un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await cartsService.addProductsToCart(cid, pid, quantity);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ status: "error",  error: error.message });
    }
});

//DELETE api/carts/:cid/products/:pid: Este endpoint eliminará un producto específico del carrito.
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartsService.removeProductFromCart(cid, pid);
        res.status(204).send({ status: "success", payload: null });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

//PUT api/carts/:cid: Este endpoint actualizará el carrito con un arreglo de productos.
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const products = req.body;
    try {
        const updatedCart = await cartsService.updateCart(cid, products);
        res.status(200).send({ status: "success", payload: updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

//PUT api/carts/:cid/products/:pid: Este endpoint actualizará la cantidad de un producto específico en el carrito.
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const updatedCart = await cartsService.updateProductQuantity(cid, pid, quantity);
        res.status(200).send({ status: "success", payload: updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

//DELETE api/carts/:cid: Este endpoint eliminará todos los productos del carrito.
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        await cartsService.clearCart(cid);
        res.status(204).send({ status: "success", payload: null });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

module.exports = router;