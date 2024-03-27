const cartsModels = require("../../models/mongo_models/carts.schema");
const productsModels = require("../../models/mongo_models/products.schema");
class CartsService {
  constructor() {
    this.cartsModel = cartsModels;
    this.productsModels = productsModels;
  }

  // Este metodo obtiene o crea un carrito para usarlo en la vista de productos.
  async getOrCreateCart() {
    let cart = await this.cartsModel.findOne();
    if (!cart) {
      cart = await this.createCart();
    }
    return cart;
  }

  // Este metodo busca un carrito por su id y trae todos los productos que tiene con Populate
  async getCartById(cid) {
    //En este código, populate('products.product') le dice a Mongoose que remplaze
    //los IDs de los productos en el carrito con los documentos de productos completos
    //de la colección de productos.
    return await this.cartsModel.findById(cid).populate("products.product");
  }

  // Este metodo crea un carrito vacio
  async createCart() {
    return await this.cartsModel.create({});
  }

  // Este metodo agrega un producto a un carrito
  async addProductsToCart(cid, pid, quantity) {
    // quantity= Number(quantity);
  
    const cart = await this.cartsModel.findById(cid);
    const product = cart.products.find(
      (product) => product.product.toString() === pid.toString()
    );

    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ product: pid ,quantity });
    }

    return await cart.save();
  }

    // Este metodo actualiza la cantidad de un producto en el carrito.
    async updateProductQuantity(cid, pid, quantity) {
      const cart = await this.cartsModel.findById(cid);
      const product = cart.products.find(
        (product) => product._id.toString() === pid
      );

      if (product) {      
        let newQuantity = product.quantity + Number(quantity);
  
        // Si la nueva cantidad es 0, borro producto del carrito.
        if (newQuantity <= 0) {   
          await this.removeProductFromCart(cid, pid)
          return;          
        }
        
        // Si la nueva cantidad es mayor que el stock del producto, la establecemos en el stock.
        const productInDb = await this.productsModels.findById(product.product);        
        if (newQuantity > productInDb?.stock) {
          newQuantity = productInDb?.stock;
        }
  
        product.quantity = newQuantity;      }
      return cart.save();
  }

  // Este metodo elimina un producto específico del carrito.
  async removeProductFromCart(cid, pid) {
    const cart = await this.cartsModel.findById(cid);
    cart.products = cart.products.filter(
      (product) => product._id.toString() !== pid
    );
    return cart.save();
  }

  // Este metodo limpia un carrito.
  async clearCart(cid) {
    const cart = await this.cartsModel.findById(cid);
    if (!cart) {
      throw new Error("El carrito no existe");
    }
    cart.products = [];
    return cart.save();
  }
}

module.exports = CartsService;
