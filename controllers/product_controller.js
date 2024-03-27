let Products = require("../models/productModels");
const { getPostData} = require('../utils')
// @desc gets all products
// @routes GET /api/product
async function getProducts(req, res) {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


//@desc gets single product
//@Route GET /api/product/id
async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };
    const newProduct = await Products.create(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//desc update Product
//Rout PUT /api/product/:id
async function updateProduct(req, res) {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const productData = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
    };

    const updatedProduct = await Products.findByIdAndUpdate(id, productData, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//@desc delete product
//@Route DELETE /api/product/:id
async function deleteProduct(req, res) {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Products.findByIdAndRemove(id);
    res.status(200).json({ message: `Product ${id} removed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
 
}
