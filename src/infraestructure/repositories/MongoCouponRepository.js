const CouponRepository = require('../../domain/repositories/CouponRepository');
const CouponModel = require('../database/models/CouponModel'); 
const Coupon = require('../../domain/entities/Coupon');      

class MongoCouponRepository extends CouponRepository {
  async create(coupon) {

    const newCoupon = await CouponModel.create(coupon);
    return new Coupon(newCoupon.toObject());
  }

  async getById(id) {
    const coupon = await CouponModel.findById(id);
    return coupon ? new Coupon(coupon.toObject()) : null;
  }

  async getByCode(code) {
    
    const coupon = await CouponModel.findOne({ code: code.toUpperCase() });
    return coupon ? new Coupon(coupon.toObject()) : null;
  }

  async update(id, updates) {
    const updatedCoupon = await CouponModel.findByIdAndUpdate(id, updates, { new: true });
    return updatedCoupon ? new Coupon(updatedCoupon.toObject()) : null;
  }

  async delete(id) {
    const result = await CouponModel.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = MongoCouponRepository;