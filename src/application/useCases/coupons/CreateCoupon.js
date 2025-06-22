const Coupon = require('../../../domain/entities/Coupon');
const CreateCouponDTO = require('../../dtos/CreateCouponDTO');
const CouponResponseDTO = require('../../dtos/CouponResponseDTO');

class CreateCoupon {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }

    async execute(createCouponData) {

        const couponDTO = new CreateCouponDTO(createCouponData); 


        const existingCoupon = await this.couponRepository.getByCode(couponDTO.code);
        if (existingCoupon) {
            throw new Error(`Coupon with code "${couponDTO.code}" already exists.`);
        }


        const coupon = new Coupon({
            code: couponDTO.code,
            discountType: couponDTO.discountType,
            discountValue: couponDTO.discountValue,
            expirationDate: couponDTO.expirationDate,
            usageLimit: couponDTO.usageLimit,
            isActive: couponDTO.isActive
        });


        const createdCoupon = await this.couponRepository.create(coupon);

   
        return new CouponResponseDTO(createdCoupon);
    }
}

module.exports = CreateCoupon;