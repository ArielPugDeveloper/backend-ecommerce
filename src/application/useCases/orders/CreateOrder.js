const Order = require('../../../domain/entities/Order');
const Product = require('../../../domain/entities/Product'); 
const CreateOrderDTO = require('../../dtos/CreateOrderDTO'); 
const OrderResponseDTO = require('../../dtos/OrderResponseDTO'); 

class CreateOrder {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository; 
    }

    async execute(createOrderData) {
     
        const orderDTO = new CreateOrderDTO(createOrderData); 

       
        const orderItems = [];
        let totalAmount = 0;

        for (const item of orderDTO.items) {
            const product = await this.productRepository.getById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
            }

            orderItems.push({
                productId: product.id,
                productName: product.name, 
                quantity: item.quantity,
                priceAtPurchase: product.price 
            });
            totalAmount += item.quantity * product.price;
        }


        const order = new Order({
            userId: orderDTO.userId, 
            items: orderItems,
            totalAmount: totalAmount,
            status: 'pending' 
        });


        const createdOrder = await this.orderRepository.create(order);

        for (const item of orderDTO.items) {
             const productToUpdate = await this.productRepository.getById(item.productId);
             if (productToUpdate) {
                 const newStock = productToUpdate.stock - item.quantity;
                 await this.productRepository.update(productToUpdate.id, { stock: newStock });
             }
        }



        return new OrderResponseDTO(createdOrder);
    }
}

module.exports = CreateOrder;