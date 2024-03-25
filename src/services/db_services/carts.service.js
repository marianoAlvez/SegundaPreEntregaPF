const cartsModels = require('../../models/mongo_models/carts.schema');

class CartsService {
    constructor() {
        this.cartsModel = cartsModels;
    }
// Este metodo busca un carrito por su id y trae todos los productos que tiene con Populate
    async getCartById(cid) {
        //En este código, populate('products.product') le dice a Mongoose que remplaze 
        //los IDs de los productos en el carrito con los documentos de productos completos 
        //de la colección de productos.
        return await this.cartsModel.findById(cid).populate('products.product');
    }

    // Este metodo crea un carrito vacio
    async createCart() {
        return await this.cartsModel.create({});
    }

    // Este metodo agrega un producto a un carrito
    async addProductsToCart(cartId, productId, quantity) {
        const cart = await this.cartsModel.findById(cartId);
        const product = cart.products.find((product) => product.product.toString() === productId);

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }
    
    // Este metodo elimina un producto específico del carrito.
    async removeProductFromCart(cid, pid) {
        const cart = await this.Cart.findById(cid);
        cart.products = cart.products.filter(product => product._id.toString() !== pid);
        return cart.save();
    }

    // Este metodo actualizará el carrito con un arreglo de productos.
    async updateCart(cid, products) {
        const cart = await this.Cart.findById(cid);
        cart.products = products;
        return cart.save();
    }

    // Este metodo actualiza la cantidad de un producto en el carrito.
    async updateProductQuantity(cid, pid, quantity) {
        const cart = await this.Cart.findById(cid);
        const product = cart.products.find(product => product._id.toString() === pid);
        if (product) {
            product.quantity = quantity;
        }
        return cart.save();
    }

    // Este metodo limpia un carrito.
    async clearCart(cid) {
        const cart = await this.Cart.findById(cid);
        cart.products = [];
        return cart.save();
    }
}

module.exports = CartsService;