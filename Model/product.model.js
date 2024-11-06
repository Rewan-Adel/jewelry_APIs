const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    oldprice: {
        type: Number,
    },
    category:
    {
        title: {
            type: String,
            required: true
        }
    },
    image: {
        type: String
    },
    images:{
        type: Array
    }
}, {
    timestamps: false
});

module.exports = mongoose.model('Product', productSchema);