
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

//getallprodyuct
router.get('/listproduct', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//addproduct
router.post('/addproduct', authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//get product by id
router.get('/oneproduct/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


//update 

router.put('/updateproduct/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// delete product

router.delete('/deleteproduct/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;