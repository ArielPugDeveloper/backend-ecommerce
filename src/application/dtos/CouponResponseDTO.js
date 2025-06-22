class CouponResponseDTO {
    constructor(coupon) {
        this.id = coupon._id ? coupon._id.toString() : coupon.id;
        this.code = coupon.code;
        this.discountType = coupon.discountType;
        this.discountValue = coupon.discountValue;
        this.expirationDate = coupon.expirationDate; 
        this.usageLimit = coupon.usageLimit;
        this.usedCount = coupon.usedCount;
        this.isActive = coupon.isActive;
        this.createdAt = coupon.createdAt;
        this.updatedAt = coupon.updatedAt;
    }
}

module.exports = CouponResponseDTO;