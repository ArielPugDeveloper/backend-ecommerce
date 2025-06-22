const Order = require('../../../domain/entities/Order');
const UpdateOrderDTO = require('../../dtos/UpdateOrderDTO');
const OrderResponseDTO = require('../../dtos/OrderResponseDTO');

class UpdateOrderStatus {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(orderId, updateData) {
        const updateOrderDTO = new UpdateOrderDTO(updateData); // Valida el nuevo estado

        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }


        const originalStatus = order.status;
        const newStatus = updateOrderDTO.status;


        const validTransitions = {
            'pending': ['processing', 'cancelled'],
            'processing': ['shipped', 'cancelled'],
            'shipped': ['delivered'],
            'delivered': [],
            'cancelled': []
        };

        if (!validTransitions[originalStatus] || !validTransitions[originalStatus].includes(newStatus)) {
            throw new Error(`Invalid status transition from ${originalStatus} to ${newStatus}.`);
        }


        const updatedOrder = await this.orderRepository.update(orderId, { status: newStatus, updatedAt: new Date() });


        if (newStatus === 'cancelled' && originalStatus !== 'cancelled') {

        }

        return new OrderResponseDTO(updatedOrder);
    }
}

module.exports = UpdateOrderStatus;