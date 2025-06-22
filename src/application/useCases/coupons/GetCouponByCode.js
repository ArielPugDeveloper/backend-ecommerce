const CouponResponseDTO = require('../../dtos/CouponResponseDTO');

class GetCouponByCode {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }

    async execute(couponCode) {
        const coupon = await this.couponRepository.getByCode(couponCode.toUpperCase()); 
        if (!coupon) {
            throw new Error(`Coupon with code "${couponCode}" not found.`);
        }
        return new CouponResponseDTO(coupon);
    }
}

module.exports = GetCouponByCode;