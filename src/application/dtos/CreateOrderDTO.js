class CreateOrderDTO {
    constructor({ items, userId }) { 
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('Order items are required.');
        }


        this.items = items.map(item => {
            if (!item.productId) {
                throw new Error('Each order item must have a productId.');
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                throw new Error('Item quantity must be a positive number.');
            }

            return {
                productId: item.productId,
                quantity: item.quantity,

            };
        });

        this.userId = userId;
    }
}

module.exports = CreateOrderDTO;