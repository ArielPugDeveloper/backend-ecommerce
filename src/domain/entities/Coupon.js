class Coupon {
    constructor({ id, code, discountType, discountValue, expirationDate, usageLimit, usedCount, isActive, createdAt, updatedAt }) {


        this.id = id;
        this.code = code;
        this.discountType = discountType; 
        this.discountValue = discountValue;
        this.expirationDate = expirationDate; 
        this.usageLimit = usageLimit; 
        this.usedCount = usedCount || 0;
        this.isActive = isActive !== undefined ? isActive : true;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

}

module.exports = Coupon;