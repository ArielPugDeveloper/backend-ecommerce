const Coupon = require('../../../domain/entities/Coupon'); 
const CouponResponseDTO = require('../../dtos/CouponResponseDTO');

class DesactivateCoupon {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }

    async execute(couponId) {

        const coupon = await this.couponRepository.getById(couponId);
        if (!coupon) {
            throw new Error(`Coupon with ID ${couponId} not found.`);
        }


        if (!coupon.isActive) {

            throw new Error(`Coupon with ID ${couponId} is already inactive.`);
        }
        const updatedCoupon = await this.couponRepository.update(couponId, {
            isActive: false,
            updatedAt: new Date() 
        });

        return new CouponResponseDTO(updatedCoupon);
    }
}

module.exports = DesactivateCoupon;