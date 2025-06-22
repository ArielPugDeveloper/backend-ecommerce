const OrderRepository = require('../../domain/repositories/OrderRepository');
const OrderModel = require('../database/models/OrderModel'); 
const Order = require('../../domain/entities/Order');       

class MongoOrderRepository extends OrderRepository {
  async create(order) {

    const newOrder = await OrderModel.create(order);
    return new Order(newOrder.toObject());
  }

  async getById(id) {
    const order = await OrderModel.findById(id);
    return order ? new Order(order.toObject()) : null;
  }

  async getByUserId(userId) {
    const orders = await OrderModel.find({ userId: userId });
    return orders.map(o => new Order(o.toObject()));
  }

  async update(id, updates) {
 
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, updates, { new: true });
    return updatedOrder ? new Order(updatedOrder.toObject()) : null;
  }

  async delete(id) {
    const result = await OrderModel.findByIdAndDelete(id);
    return !!result; 
  }
}

module.exports = MongoOrderRepository;