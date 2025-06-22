const CreateOrder = require('../../application/useCases/orders/CreateOrder');
const GetOrderById = require('../../application/useCases/orders/GetOrderById');
const GetUserOrders = require('../../application/useCases/orders/GetUserOrders');
const UpdateOrderStatus = require('../../application/useCases/orders/UpdateOrderStatus');
const OrderResponseDTO = require('../../application/dtos/OrderResponseDTO');

class OrderController {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository; 

        this.createOrderUseCase = new CreateOrder(this.orderRepository, this.productRepository);
        this.getOrderByIdUseCase = new GetOrderById(this.orderRepository);
        this.getUserOrdersUseCase = new GetUserOrders(this.orderRepository);
        this.updateOrderStatusUseCase = new UpdateOrderStatus(this.orderRepository);
    }

    async createOrder(req, res) {
        try {
            const userId = req.user.id; 
            const orderData = { ...req.body, userId }; 

            const order = await this.createOrderUseCase.execute(orderData);
            res.status(201).json(order); 
        } catch (error) {
            console.error('Error creating order:', error);
       
            if (error.message.includes('required') || error.message.includes('invalid') || error.message.includes('stock')) {
                return res.status(400).json({ message: error.message }); 
            }
            res.status(500).json({ message: 'Error creating order' });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await this.getOrderByIdUseCase.execute(id);
            res.status(200).json(order); 
        } catch (error) {
            console.error('Error getting order by ID:', error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error retrieving order' });
        }
    }

    async getUserOrders(req, res) {
        try {
          
            const userId = req.user.id; 
            const orders = await this.getUserOrdersUseCase.execute(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error getting user orders:', error);
            res.status(500).json({ message: 'Error retrieving user orders' });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body; 

            const updatedOrder = await this.updateOrderStatusUseCase.execute(id, { status });
            res.status(200).json(updatedOrder); 
        } catch (error) {
            console.error('Error updating order status:', error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes('Invalid status transition')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error updating order status' });
        }
    }
}

module.exports = OrderController;