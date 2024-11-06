const Product = require('../Model/product.model.js');
const mongoose = require('mongoose');

exports.getAll = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            code: 200,
            totalProducts: products.length,
            data: products
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            code: 500,
            message: err.message
        });
    }
}

exports.getOne = async(req, res) => {
    try {
        if (!req.params.id || req.params.id  == ':id') {
            return res.status(400).json({
                status: 'fail',
                code: 400,
                message: 'Please provide product id'
            });
        }

        let product = {};
        if (mongoose.Types.ObjectId.isValid(req.params.id))
            product = await Product.findById(req.params.id);
        

        else product = await Product.findOne({id:req.params.id});

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                code: 404,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            code: 200,
            data: product
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            code: 500,
            message: err.message
        });
    }
};

exports.filtration = async(req, res) => {
    try {
        console.log(req.query);
        const { category, price, name, rating } = req.query;
        let products = null;
        if(name)
            products = await Product.find({ name:  name  });
        
        else products = await Product.find({ 
            $or: [
                { 'category.title': category },
                { price: { $lte: price } },
                {rating: { $eq: rating }}
            ]
        });
        if (!products) {
            return res.status(404).json({
                status: 'fail',
                code: 404,
                message: 'Products not found'
            });
        };
        res.status(200).json({
            status: 'success',
            code: 200,
            totalProducts: products.length,
            data: products
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            code: 500,
            message: err.message
        });
    }
};