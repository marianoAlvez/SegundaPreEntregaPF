const productsModels = require('../../models/mongo_models/products.schema');

class ProductsService {
    constructor() {
        this.productsModel = productsModels;
    }

    async getAllProducts(limit = 10, page = 1, sort = null, query = null) {
        const options = {
            page,
            limit,
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            customLabels: {
                docs: 'products',
                totalDocs: 'totalProducts'
            }
        };
    
        let searchQuery = {};
    
        // $options: 'i' en MongoDB se utiliza para hacer que la búsqueda sea insensible a mayúsculas y minúsculas.
        if (query) {
            searchQuery.title = { $regex: query, $options: 'i' };
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

    async updateProductById(productId, updatedProductData) {
        return await this.productsModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
    }

    async deleteProductById(productId) {
        return await this.productsModel.findByIdAndDelete(productId);
    }
}

module.exports = ProductsService;