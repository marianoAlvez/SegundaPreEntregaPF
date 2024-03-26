const productsModels = require("../../models/mongo_models/products.schema");

class ProductsService {
  constructor() {
    this.productsModel = productsModels;
  }

  async getAllProducts(params) {
    const {
      limit = 2, // default limit = 3
      page = 1, // default page = 1
      sort = null,
      query = null,
      category = null,
      status = null, //available
    } = params;

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      customLabels: {
        docs: "products",
        totalDocs: "totalProducts",
      },
    };

    let searchQuery = {};

    // $options: 'i' en MongoDB se utiliza para hacer que la búsqueda sea insensible a mayúsculas y minúsculas.
    if (query) {
      searchQuery.title = { $regex: query, $options: "i" };
    }

    if (category) {
      searchQuery.category = { $regex: category, $options: "i" };
    }

    if (status !== null) {
      searchQuery.status = status === "true";
    }

    const result = await this.productsModel.paginate(searchQuery, options);

    return result;
  }

  async getProductById(productId) {
    return await this.productsModel.findById(productId);
  }

  async addProduct(productData) {
    return await this.productsModel.create(productData);
  }

  async updateProductById(cid, updatedProductData) {
    return await this.productsModel.findByIdAndUpdate(
      cid,
      updatedProductData,
      { new: true }
    );
  }

  async deleteProductById(productId) {
    return await this.productsModel.findByIdAndDelete(productId);
  }
}

module.exports = ProductsService;
