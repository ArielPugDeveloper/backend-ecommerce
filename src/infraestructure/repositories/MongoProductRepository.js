const ProductRepository = require('../../domain/repositories/ProductRepository');
const ProductModel = require('../database/models/ProductModel');
const Product = require('../../domain/entities/Product');

class MongoProductRepository extends ProductRepository {
  async getAll() {
    const products = await ProductModel.find();
    console.log('Products retrieved from MongoDB:', products);
    return products.map(p => new Product(p.toObject()));
  }

  async create(product) {
    const newProduct = await ProductModel.create(product);
    return new Product(newProduct.toObject());
  }
}

module.exports = MongoProductRepository;