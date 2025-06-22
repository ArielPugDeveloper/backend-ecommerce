class CreateCouponDTO {
    constructor({ code, discountType, discountValue, expirationDate, usageLimit, isActive }) {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error('Coupon code is required.');
        }
        if (!['percentage', 'fixed'].includes(discountType)) {
            throw new Error('Discount type must be "percentage" or "fixed".');
        }
        if (typeof discountValue !== 'number' || discountValue < 0) {
            throw new Error('Discount value must be a non-negative number.');
        }
        if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
            throw new Error('Percentage discount must be between 0 and 100.');
        }
        if (expirationDate && isNaN(new Date(expirationDate).getTime())) {
            throw new Error('Invalid expiration date format.');
        }
        if (usageLimit !== undefined && (typeof usageLimit !== 'number' || usageLimit < 0)) {
            throw new Error('Usage limit must be a non-negative number if provided.');
        }

        this.code = code.trim().toUpperCase();
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.expirationDate = expirationDate ? new Date(expirationDate) : null;
        this.usageLimit = usageLimit || null;
        this.isActive = isActive !== undefined ? isActive : true;
    }
}

module.exports = CreateCouponDTO;