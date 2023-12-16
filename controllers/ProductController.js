const express = require('express');
const Product = require('../models/ProductModel');


//get all the products
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find().sort({
            createdAt: -1,
        });
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

//get all subcategories
const getSubcategories = async (req, res) => {
    try {
        const brands = await Brand.find({}); // Fetch all brands
        const subcategories = brands.reduce((acc, brand) => {
            // Extract individual subcategories from each brand's subcategories array
            brand.subcategories.forEach(subcategory => {
                if (!acc.includes(subcategory)) {
                    acc.push(subcategory);
                }
            });
            return acc;
        }, []);

        res.status(200).json(subcategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Subcategories not available' });
    }
}

//get product by category
const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const product = await Product.find({ category });
        if (!product) {
            res.status(404).json({ message: 'you have no category' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}

//get product by shopid
const getProductByShopId = async(req,res)=>{
    try {
      const { shopId } = req.params;
  
      // Assuming you have a Product model with a 'shopId' field
      const products = await Product.find({ shopId });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


module.exports = {
    getAllProducts,
    getSubcategories,
    getProductByCategory,
    getProductByShopId
}
