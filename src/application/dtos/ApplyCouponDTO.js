class ApplyCouponDTO {
    constructor({ couponCode, orderId, currentAmount }) {
        if (!couponCode || typeof couponCode !== 'string' || couponCode.trim() === '') {
            throw new Error('Coupon code is required.');
        }

        if (orderId && typeof orderId !== 'string') {
            throw new Error('Order ID must be a string if provided.');
        }
        if (currentAmount !== undefined && (typeof currentAmount !== 'number' || currentAmount < 0)) {
             throw new Error('Current amount must be a non-negative number if provided.');
        }

        this.couponCode = couponCode.trim().toUpperCase();
        this.orderId = orderId || null;
        this.currentAmount = currentAmount || null;
    }
}

module.exports = ApplyCouponDTO;