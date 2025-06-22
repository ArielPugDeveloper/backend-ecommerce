class Order {
    constructor({ id, userId, items, totalAmount, status, createdAt, updatedAt }) {
        this.id = id;
        this.userId = userId;

        this.items = items;
        this.totalAmount = totalAmount; 
        this.status = status; 
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

}

module.exports = Order;