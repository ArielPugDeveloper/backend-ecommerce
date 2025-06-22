const ApplyCouponDTO = require('../../dtos/ApplyCouponDTO');
const OrderResponseDTO = require('../../dtos/OrderResponseDTO'); // Si actualiza la orden y la retorna

class ApplyCouponToOrder {
    constructor(couponRepository, orderRepository) {
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
    }

    async execute(applyCouponData) {
        const applyDTO = new ApplyCouponDTO(applyCouponData); 

        const coupon = await this.couponRepository.getByCode(applyDTO.couponCode);
        if (!coupon) {
            throw new Error(`Coupon with code "${applyDTO.couponCode}" not found.`);
        }

        if (!coupon.isActive) {
            throw new Error('Coupon is inactive.');
        }
        if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) {
            throw new Error('Coupon has expired.');
        }
        if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
            throw new Error('Coupon usage limit reached.');
        }

        let originalAmount = applyDTO.currentAmount;
        let finalAmount;

        if (applyDTO.orderId) {
            const order = await this.orderRepository.getById(applyDTO.orderId);
            if (!order) {
                throw new Error(`Order with ID ${applyDTO.orderId} not found.`);
            }
            originalAmount = order.totalAmount; 
        }

        if (coupon.discountType === 'percentage') {
            finalAmount = originalAmount * (1 - coupon.discountValue / 100);
        } else if (coupon.discountType === 'fixed') {
            finalAmount = originalAmount - coupon.discountValue;
        }
        finalAmount = Math.max(0, finalAmount); 

        if (applyDTO.orderId) {

            const updatedOrder = await this.orderRepository.update(applyDTO.orderId, {
                totalAmount: finalAmount,

                couponCodeUsed: coupon.code,
                updatedAt: new Date()
            });


            await this.couponRepository.update(coupon.id, {
                usedCount: coupon.usedCount + 1,
                updatedAt: new Date()
            });

            return new OrderResponseDTO(updatedOrder); 
        }


        return { originalAmount, finalAmount, appliedCouponCode: coupon.code };
    }
}

module.exports = ApplyCouponToOrder;