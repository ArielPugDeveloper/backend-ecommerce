const CreateCoupon = require('../../application/useCases/coupons/CreateCoupon');
const GetCouponByCode = require('../../application/useCases/coupons/GetCouponByCode');
const ApplyCouponToOrder = require('../../application/useCases/coupons/ApplyCouponToOrder');


class CouponController {
    constructor(couponRepository, orderRepository) { 
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;


        this.createCouponUseCase = new CreateCoupon(this.couponRepository);
        this.getCouponByCodeUseCase = new GetCouponByCode(this.couponRepository);
        this.applyCouponToOrderUseCase = new ApplyCouponToOrder(this.couponRepository, this.orderRepository);
    }

    async createCoupon(req, res) {
        try {


            const coupon = await this.createCouponUseCase.execute(req.body);
            res.status(201).json(coupon); // El caso de uso ya retorna el DTO de respuesta
        } catch (error) {
            console.error('Error creating coupon:', error);
            if (error.message.includes('required') || error.message.includes('invalid')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('already exists')) {
                return res.status(409).json({ message: error.message }); // 409 Conflict para duplicados
            }
            res.status(500).json({ message: 'Error creating coupon' });
        }
    }

    async getCouponByCode(req, res) {
        try {
            const { code } = req.params;
            const coupon = await this.getCouponByCodeUseCase.execute(code);
            res.status(200).json(coupon); // El caso de uso ya retorna el DTO de respuesta
        } catch (error) {
            console.error('Error getting coupon by code:', error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error retrieving coupon' });
        }
    }

    async applyCoupon(req, res) {
        try {

            const result = await this.applyCouponToOrderUseCase.execute(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error applying coupon:', error);
            if (error.message.includes('not found') || error.message.includes('invalid') || error.message.includes('expired') || error.message.includes('usage limit')) {
                return res.status(400).json({ message: error.message }); // Para errores de negocio específicos
            }
            res.status(500).json({ message: 'Error applying coupon' });
        }
    }
}

module.exports = CouponController;