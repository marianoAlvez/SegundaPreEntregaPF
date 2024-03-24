const express = require('express');
const router = express.Router();
const productsModel = require('../models/mongo_models/products.schema.js');

// GET /products
router.get('/products', async (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit) || 3; // default limit = 3

      if (!page) page = 1 // default page = 1
      let result = await productsModel.paginate({}, { page, limit: limit, lean: true })
      
      result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
      result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
      
      result.isValid = !(page < 1 || page > result.totalPages)
      
      res.render("products", result)
  });

  module.exports = router;