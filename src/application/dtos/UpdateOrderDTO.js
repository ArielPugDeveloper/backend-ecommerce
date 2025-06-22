class UpdateOrderDTO {
    constructor({ status }) {
        if (!status || typeof status !== 'string') {
            throw new Error('Order status is required for update.');
        }
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid order status: ${status}.`);
        }
        this.status = status;
    }
}

module.exports = UpdateOrderDTO;