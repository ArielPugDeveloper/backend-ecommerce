class OrderResponseDTO {
    constructor(order) {
        this.id = order._id ? order._id.toString() : order.id; 
        this.userId = order.userId ? order.userId.toString() : order.userId; 
        this.items = order.items.map(item => ({
            productId: item.productId ? item.productId.toString() : item.productId,
            productName: item.productName,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase
        }));
        this.totalAmount = order.totalAmount;
        this.status = order.status;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}

module.exports = OrderResponseDTO;