const OrderResponseDTO = require('../../dtos/OrderResponseDTO');

class GetOrderById {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(orderId) {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        return new OrderResponseDTO(order);
    }
}

module.exports = GetOrderById;