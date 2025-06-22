const mongoose = require('../mongoose'); 

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya códigos de cupón duplicados
        trim: true,
        uppercase: true // Guarda el código en mayúsculas para búsquedas consistentes
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],
        message: 'Discount type must be "percentage" or "fixed".'
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function(v) {
                // Si es porcentaje, debe estar entre 0 y 100
                return this.discountType === 'percentage' ? (v >= 0 && v <= 100) : v >= 0;
            },
            message: 'Percentage discount must be between 0 and 100.'
        }
    },
    expirationDate: {
        type: Date,
        default: null // Null si no hay fecha de caducidad
    },
    usageLimit: {
        type: Number,
        min: 0,
        default: null // Null si no hay límite de uso
    },
    usedCount: {
        type: Number,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);