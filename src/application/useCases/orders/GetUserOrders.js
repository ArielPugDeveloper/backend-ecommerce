const OrderResponseDTO = require('../../dtos/OrderResponseDTO');

class GetUserOrders {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(userId) { 
        const orders = await this.orderRepository.getByUserId(userId);
        return orders.map(order => new OrderResponseDTO(order));
    }
}

module.exports = GetUserOrders;